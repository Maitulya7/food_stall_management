import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  IconButton,
  Box,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import DEFAULT_URL from "../../../../config";
import axios from "axios";
import Footer from "../Components/Footer";
import useRazorpay from "react-razorpay";

const CustomerCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [vendorTotalPrices, setVendorTotalPrices] = useState({});
  const [groupedCartItems, setGroupedCartItems] = useState({});
  const [Razorpay] = useRazorpay();

  useEffect(() => {
    const accessToken = localStorage.getItem("access-token");

    const fetchCartItems = async () => {
      try {
        const response = await axios.get(
          `${DEFAULT_URL}/api/v1/customer/cart`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "ngrok-skip-browser-warning": true,
            },
          }
        );
        const cartData = response.data.cart;
        setCartItems(cartData.cart_items);

        const total = calculateTotalPrice(cartData.cart_items);
        setTotalPrice(total);

        await axios.put(
          `${DEFAULT_URL}/api/v1/customer/carts`,
          {
            cart: {
              final_price: total,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  const calculateTotalPrice = (items) => {
    return items.reduce((acc, item) => acc + item.price, 0);
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
      await axios.delete(
        `${DEFAULT_URL}/api/v1/customer/carts/cart_items/${cartItemId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setCartItems(cartItems.filter((item) => item.id !== cartItemId));
      const total = calculateTotalPrice(
        cartItems.filter((item) => item.id !== cartItemId)
      );
      setTotalPrice(total);
    } catch (error) {
      console.error("Error removing cart item:", error);
    }
  };

  const updateCartItem = async (existingCartItem, newQuantity) => {
    try {
      const accessToken = localStorage.getItem("access-token");
      const { id: foodItemId, price } = existingCartItem.food_item;
      const updatedPrice = price * newQuantity;

      await axios.put(
        `${DEFAULT_URL}/api/v1/customer/carts/cart_items/${existingCartItem.id}`,
        {
          cart_item: {
            food_item_id: foodItemId,
            quantity: newQuantity,
            price: updatedPrice,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const updatedCartItems = cartItems.map((item) => {
        if (item.id === existingCartItem.id) {
          return { ...item, quantity: newQuantity, price: updatedPrice };
        }
        return item;
      });
      setCartItems(updatedCartItems);
      const total = calculateTotalPrice(updatedCartItems);
      setTotalPrice(total);
    } catch (error) {
      console.error("Error updating cart item:", error);
    }
  };

  const handlePayment = (vendorID, totalAmount, totalItem) => {
    const accessToken = localStorage.getItem("access-token");
    axios
      .post(
        `${DEFAULT_URL}/api/v1/customer/orders`,
        {
          order: {
            vendor_id: vendorID,
            amount_to_be_paid: totalAmount,
            total_items: totalItem,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        console.log("this is my payment response: ", response);

        if (response.data.order.status === "pending") {
          const options = {
            key: "rzp_test_sF4v8bweGRs5TH",
            currency: "INR",
            order_id: response.data.order.razorpay_order_id,
            handler: (response) => {
              axios
                .post(
                  `${DEFAULT_URL}/api/v1/customer/orders/callback`,
                  {
                    order_id: response.razorpay_order_id,
                    payment_id: response.razorpay_payment_id,
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${accessToken}`,
                    },
                  }
                )
                .then((response) => {
                  if (response.status === 200) {
                    sendOrderAndPaymentIds(
                      response.razorpay_order_id,
                      response.razorpay_payment_id
                    );
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
    const accessToken = localStorage.getItem("access-token");
    axios
      .post(
        `${DEFAULT_URL}/api/v1/customer/orders/callback`,
        {
          order_id: order_id,
          payment_id: payment_id,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        console.log("Order and payment IDs sent to backend successfully");
        console.log(response);
      })
      .catch((error) => {
        console.error("Error sending order and payment IDs to backend:", error);
      });
  };

  useEffect(() => {
    cartItems.reduce((grouped, item) => {
      const vendorId = item.food_item.vendor_category.vendor.id;
      if (!grouped[vendorId]) {
        grouped[vendorId] = [];
      }
      grouped[vendorId].push(item);
      setGroupedCartItems(grouped);
      return grouped;
    }, {});
  }, [cartItems]);

  useEffect(() => {
    const vendorPrices = {};
    for (const vendorId in groupedCartItems) {
      const items = groupedCartItems[vendorId];
      const totalAmount = calculateTotalPrice(items);
      vendorPrices[vendorId] = totalAmount;
    }
    setVendorTotalPrices(vendorPrices);
  }, [groupedCartItems]);

  return (
    <>
      <Grid
        container
        justifyContent="center"
        spacing={2}
        sx={{
          padding: "20px",
          marginBottom: "60px",
          backgroundColor: "#f5f5f5",
        }}
      >
        <Grid item xs={12} md={8}>
          <Typography
            variant="h4"
            sx={{
              marginBottom: "20px",
              textAlign: "center",
              color: "#333",
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
          >
            <ShoppingCartIcon sx={{ marginRight: "10px", color: "#555" }} />
            Your Cart
          </Typography>
          {Object.keys(groupedCartItems).length === 0 ? (
            <Typography
              variant="body1"
              sx={{
                textAlign: "center",
                color: "#555",
                fontStyle: "italic",
              }}
            >
              Your cart is empty
            </Typography>
          ) : (
            <>
              {Object.entries(groupedCartItems).map(([vendorId, items]) => (
                <Box key={vendorId} sx={{ marginBottom: "20px" }}>
                  <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                    {items[0].food_item.vendor_category.vendor.stall_name}
                  </Typography>
                  {items.map((item) => (
                    <Card key={item.id} sx={{ marginBottom: "10px" }}>
                      <CardContent>
                        <Typography variant="body1">
                          {item.food_item.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Price: ₹{item.food_item.price}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Total Price: ₹{item.price}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <IconButton
                          size="large"
                          onClick={() => handleDecrement(item)}
                        >
                          <RemoveIcon />
                        </IconButton>
                        <Typography variant="body1">{item.quantity}</Typography>
                        <IconButton
                          size="large"
                          onClick={() => handleIncrement(item)}
                        >
                          <AddIcon />
                        </IconButton>
                        <IconButton
                          size="large"
                          onClick={() => handleRemove(item.id)}
                        >
                          <RemoveShoppingCartIcon sx={{ color: "#ff4f4f" }} />
                        </IconButton>
                      </CardActions>
                    </Card>
                  ))}
                  <Typography variant="h6">
                    Total Amount: ₹{vendorTotalPrices[vendorId]}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{
                      backgroundColor: "#4CAF50",
                      color: "#fff",
                      marginTop: "10px",
                    }}
                    onClick={() =>
                      handlePayment(
                        vendorId,
                        calculateTotalPrice(items),
                        items.reduce((total, item) => total + item.quantity, 0)
                      )
                    }
                  >
                    Proceed to Payment
                  </Button>
                </Box>
              ))}
            </>
          )}
          <Typography
            variant="h6"
            sx={{
              marginBottom: "10px",
              textAlign: "center",
              color: "#333",
              marginTop: "20px",
              fontWeight: "bold",
            }}
          >
            Final Price: ₹{totalPrice}
          </Typography>
        </Grid>
      </Grid>
      <Footer />
    </>
  );
};

export default CustomerCart;
