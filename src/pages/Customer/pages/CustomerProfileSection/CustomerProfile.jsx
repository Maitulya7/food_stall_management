import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, Card, CardContent, CircularProgress, Container, Grid, Typography } from '@mui/material';
import DEFAULT_URL from '../../../../config';
import Footer from '../Components/Footer';

const CustomerProfile = () => {
  const [customerOrders, setCustomerOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('all');

  useEffect(() => {
    const fetchCustomerOrders = async () => {
      try {
        const response = await axios.get(`${DEFAULT_URL}/api/v1/customer/orders`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access-token')}`,
            "ngrok-skip-browser-warning": true,
          }
        });
        setCustomerOrders(response.data.orders);
        setFilteredOrders(response.data.orders);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching customer orders:', error);
      }
    };

    fetchCustomerOrders();
  }, []);

  const handleFilter = (status) => {
    setSelectedFilter(status);
    if (status === 'all') {
      setFilteredOrders(customerOrders);
    } else {
      const filtered = customerOrders.filter(order => order.status === status);
      setFilteredOrders(filtered);
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h3" sx={{ mt: 4, mb: 2 }}>Customer Orders</Typography>
      <Box sx={{ mb: 2 }}>
        <Button onClick={() => handleFilter('all')} variant={selectedFilter === 'all' ? 'contained' : 'outlined'} sx={{ m: 1 }}>All</Button>
        <Button onClick={() => handleFilter('approved')} variant={selectedFilter === 'approved' ? 'contained' : 'outlined'} sx={{ m: 1 }}>Approved</Button>
        <Button onClick={() => handleFilter('rejected')} variant={selectedFilter === 'rejected' ? 'contained' : 'outlined'} sx={{ m: 1 }}>Rejected</Button>
        <Button onClick={() => handleFilter('ready_for_delivery')} variant={selectedFilter === 'ready_for_delivery' ? 'contained' : 'outlined'} sx={{m:1}}>Ready for Delivery</Button>
      </Box>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4  }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={2}>
          {filteredOrders.map(order => (
            <Grid key={order.id} item xs={12} sm={6} md={4} lg={3}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Order ID: {order.id}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Status: {order.status}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Items: {order.total_items}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Amount to be Paid: {order.amount_to_be_paid}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Payment Status: {order.payment_status}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Created At: {new Date(order.created_at).toLocaleString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      <Footer />
    </Container>
  );
};

export default CustomerProfile;
