import React, { useEffect, useState } from 'react';
import { Grid, Typography, Card, CardContent, CardActions, Button, IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DEFAULT_URL from '../../../../config';
import axios from 'axios';

const CustomerCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("access-token");

    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`${DEFAULT_URL}/api/v1/customer/cart`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });
        setCartItems(response.data.cart.cart_items);
        calculateTotalPrice(response.data.cart.cart_items);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, []);

  const calculateTotalPrice = (items) => {
    let totalPrice = 0;
    items.forEach(item => {
      totalPrice += item.quantity * item.price;
    });
    setTotalPrice(totalPrice);
  };

  const handleIncrementQuantity = (index) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems[index].quantity += 1;
    setCartItems(updatedCartItems);
    calculateTotalPrice(updatedCartItems);
  };

  const handleDecrementQuantity = (index) => {
    const updatedCartItems = [...cartItems];
    if (updatedCartItems[index].quantity > 1) {
      updatedCartItems[index].quantity -= 1;
      setCartItems(updatedCartItems);
      calculateTotalPrice(updatedCartItems);
    }
  };

  const handlePayment = () => {
    // Implement payment logic here
    console.log("Payment processed!");
  };

  return (
    <Grid container justifyContent="center" spacing={2} style={{ padding: '20px' }}>
      <Grid item xs={12} md={8}>
        <Typography variant="h4" style={{ marginBottom: '20px', textAlign: 'center' }}>
          <ShoppingCartIcon style={{ marginRight: '10px' }} />
          Your Cart
        </Typography>
        {cartItems.length === 0 ? (
          <Typography variant="body1" style={{ textAlign: 'center' }}>Your cart is empty</Typography>
        ) : (
      <Grid container spacing={2}>
  {cartItems.map((item, index) => (
    <Grid item xs={12} lg={6} key={item.id}>
      <Card style={{ marginBottom: '20px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', borderRadius: '8px' }}>
        <CardContent>
          <Typography variant="h6">{item.food_item.name}</Typography>
          <Typography variant="body1">Price: ${item.price}</Typography>
          <Typography variant="body2">Item Type: {item.food_item.item_type}</Typography>
          <Typography variant="body2">Taste: {item.food_item.taste.join(', ')}</Typography>
          {item.food_item.sub_type && (
            <Typography variant="body2">Sub Type: {item.food_item.sub_type.join(', ')}</Typography>
          )}
          {item.food_item.tags && (
            <Typography variant="body2">Tags: {item.food_item.tags.join(', ')}</Typography>
          )}
          {item.food_item.vendor_category?.vendor?.stall_name && ( // Safely access stall_name
            <Typography variant="body2">Stall Name: {item.food_item.vendor_category.vendor.stall_name}</Typography>
          )}
        </CardContent>
        <CardActions style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #eee', padding: '16px' }}>
          <div>
            <IconButton onClick={() => handleDecrementQuantity(index)} size="small">
              <RemoveIcon />
            </IconButton>
            <Typography variant="body1" style={{ margin: '0 10px' }}>{item.quantity}</Typography>
            <IconButton onClick={() => handleIncrementQuantity(index)} size="small">
              <AddIcon />
            </IconButton>
          </div>
          <Button variant="contained" color="primary" onClick={handlePayment}>Pay ${item.quantity * item.price}</Button>
        </CardActions>
      </Card>
    </Grid>
  ))}
</Grid>

        )}
        <Typography variant="h6" style={{ marginTop: '20px', textAlign: 'right' }}>Total Price: ${totalPrice}</Typography>
        <Button variant="contained" color="primary" fullWidth onClick={handlePayment} style={{ marginTop: '20px' }}>Proceed to Payment</Button>
      </Grid>
    </Grid>
  );
};

export default CustomerCart;
