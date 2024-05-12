import React, { useEffect, useState } from 'react';
import { Grid, Typography, Card, CardContent, CardActions, Button, IconButton, Box } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import DEFAULT_URL from '../../../../config';
import axios from 'axios';
import Footer from "../Components/Footer"
import useRazorpay from "react-razorpay";

const CustomerCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [vendorId , setVendorId] = useState('')
  const [Razorpay] = useRazorpay();




  useEffect(() => {
    const accessToken = localStorage.getItem("access-token");

    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`${DEFAULT_URL}/api/v1/customer/cart`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            "ngrok-skip-browser-warning": true,
          }
        });
        const cartData = response.data.cart;
        setCartItems(cartData.cart_items);
        const vendor_information = response.data.cart.cart_items[0].food_item.vendor_category.vendor
        setVendorId(vendor_information.id)
        console.log()
        const total = calculateTotalPrice(cartData.cart_items);
        setTotalPrice(total);

        await axios.put(`${DEFAULT_URL}/api/v1/customer/carts`, {
          cart: {
            "final_price": total
          }
        }, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          }
        });
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, []);


  const calculateTotalPrice = (items) => {
    const total = items.reduce((acc, item) => acc + (item.price), 0);
    return total;
  };

  const handleIncrement = async (existingCartItem) => {
    const newQuantity = existingCartItem.quantity + 1;
    await updateCartItem(existingCartItem, newQuantity);
  };

  const handleDecrement = async (existingCartItem) => {
    if (existingCartItem.quantity === 1) {
      return;
    }
    const newQuantity = existingCartItem.quantity - 1;
    await updateCartItem(existingCartItem, newQuantity);
  };

  const handleRemove = async (cartItemId) => {
    try {
      const accessToken = localStorage.getItem("access-token");
      await axios.delete(`${DEFAULT_URL}/api/v1/customer/carts/cart_items/${cartItemId}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        }
      });
      setCartItems(cartItems.filter(item => item.id !== cartItemId));
      const total = calculateTotalPrice(cartItems.filter(item => item.id !== cartItemId));
      setTotalPrice(total);
    } catch (error) {
      console.error('Error removing cart item:', error);
    }
  };

  const updateCartItem = async (existingCartItem, newQuantity) => {
    try {
      const accessToken = localStorage.getItem("access-token");
      const { id: foodItemId, price } = existingCartItem.food_item;
      const updatedPrice = price * newQuantity;

      await axios.put(`${DEFAULT_URL}/api/v1/customer/carts/cart_items/${existingCartItem.id}`, {
        cart_item: {
          "food_item_id": foodItemId,
          "quantity": newQuantity,
          "price": updatedPrice
        }
      }, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        }
      });

      const updatedCartItems = cartItems.map(item => {
        if (item.id === existingCartItem.id) {
          return { ...item, quantity: newQuantity, price: updatedPrice };
        }
        return item;
      });
      setCartItems(updatedCartItems);
      const total = calculateTotalPrice(updatedCartItems);
      setTotalPrice(total);
    } catch (error) {
      console.error('Error updating cart item:', error);
    }
  };


  const handlePayment = (vendor) => {
    const accessToken = localStorage.getItem("access-token")
    axios
      .post(`${DEFAULT_URL}/api/v1/customer/orders`, {
        order:{
          "vendor_id":vendor.vendor.id,
          "amount_to_be_paid": totalPrice ,
          "total_items": 5
        }
      }, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        }
      })
      .then((response) => {
        console.log("this is my payment response: ",response);

        if (response.data.order.status === "pending") {
          const options = {
            key: "rzp_test_sF4v8bweGRs5TH",
            currency: "INR",
            order_id: response.data.order.razorpay_order_id,
            handler: (response) => {
              axios
                .post(`${DEFAULT_URL}/api/v1/customer/orders/callback`, {
                  order_id: response.razorpay_order_id,
                  payment_id: response.razorpay_payment_id,
                }, 
                {
                  headers: {
                    'Authorization': `Bearer ${accessToken}`,
                  }
                })
                .then((response) => {
                  if (response.status === 200) {
                    sendOrderAndPaymentIds(response.razorpay_order_id, response.razorpay_payment_id);
                  }
                })
                .catch((error) => {
                  console.log(error.message);
                });
            },
            theme: {
              color: "#074173",
            },
          };
          const razorpay = new Razorpay(options);
          razorpay.open();
          razorpay.on("Payment Success", (res) => {});
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  
  const sendOrderAndPaymentIds = (order_id, payment_id) => {
    const accessToken = localStorage.getItem("access-token")
    axios
      .post(`${DEFAULT_URL}/api/v1/customer/orders/callback`, {
        order_id: order_id,
        payment_id: payment_id,
      }, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        }
      })
      .then((response) => {
        console.log("Order and payment IDs sent to backend successfully");
        console.log(response)
      })
      .catch((error) => {
        console.error("Error sending order and payment IDs to backend:", error);
      });
  };


  return (
    <>
    <Grid container justifyContent="center" spacing={2} style={{ padding: '20px' }}>
      <Grid  item xs={12} md={8}>
        <Typography variant="h4" style={{ marginBottom: '20px', textAlign: 'center', color: '#333' }}>
          <ShoppingCartIcon style={{ marginRight: '10px', color: '#555' }} />
          Your Cart
        </Typography>
        {cartItems.length === 0 ? (
          <Typography variant="body1" style={{ textAlign: 'center', color: '#555' }}>Your cart is empty</Typography>
        ) : (
          <Grid container spacing={2}>
            {cartItems.map((item, index) => (
              <Grid item xs={12} lg={6} key={item.id}>
                <Card style={{ marginBottom: '20px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', borderRadius: '8px', transition: '0.3s' }}>
                  <CardContent style={{ backgroundColor: '#f9f9f9', padding: '30px', borderRadius: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '15px' }}>
                      <Typography>{item.food_item?.vendor_category?.vendor?.stall_name}</Typography>

                      <Typography variant="h4" style={{ color: '#777', fontWeight: 'bold' }}>${item.food_item.price}</Typography>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'auto auto', gridGap: '10px' }}>
                      <div style={{ display: 'flex', flexDirection: "column" }}>
                        <Typography variant="h6" style={{ marginRight: '10px' }}>{item.food_item.name}</Typography>
                        <Box sx={{ display: "flex", gap: "5px", alignItems: "center", marginTop: "15px" }}>
                          <Typography variant="h6" style={{ color: '#555', marginRight: '5px' }}>Item Type:</Typography>
                          <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: item.food_item.item_type === 'veg' ? 'red' : 'green' }}></div>
                          <Typography variant="h6" style={{ marginLeft: '5px' }}>{item.food_item.item_type}</Typography>
                        </Box>

                      </div>

                    </div>
                    <Box sx={{ display: "flex", gap: "5px", marginTop: '15px' }}>
                      <Typography variant="h6" style={{ color: '#555' }}>Taste:</Typography>
                      <Typography variant="h6">{item.food_item.taste.join(', ')}</Typography>
                    </Box>
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '15px' }}>
                      <Typography variant="h6" style={{ color: '#555', marginRight: '10px' }}>Total Price:</Typography>
                      <Typography variant="body1" style={{ fontWeight: 'bold' }}>${item.price}</Typography>
                    </div>
                  </CardContent>

                  <CardActions style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #eee', padding: '16px', backgroundColor: '#f9f9f9' }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <IconButton sx={{ border: "1px solid gray" }} size="large" onClick={() => handleDecrement(item)}>
                        <RemoveIcon />
                      </IconButton>
                      <Typography variant="body1" style={{ margin: '0 10px', color: '#555', fontWeight: "bold" }}>{item.quantity}</Typography>
                      <IconButton sx={{ border: "1px solid gray" }} size="large" onClick={() => handleIncrement(item)}>
                        <AddIcon />
                      </IconButton>
                    </Box>
                    <IconButton size="large" onClick={() => handleRemove(item.id)}>
                      <RemoveShoppingCartIcon style={{ color: '#ff4f4f' }} />
                    </IconButton>
                  </CardActions>
                </Card>
                <Typography variant="h6" style={{ marginBottom: '10px', textAlign: 'center', color: '#333' }}>Total Price: ${totalPrice}</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  style={{ marginTop: '20px', backgroundColor: '#4CAF50', color: '#fff' }}
                  onClick={() => handlePayment({vendor:item.food_item?.vendor_category?.vendor})}
                  >
                  Proceed to Payment
                </Button>
              </Grid>
            ))}
          </Grid>
        )}

      </Grid>

    </Grid>
    <Footer />
            </>
  );
};

export default CustomerCart;
