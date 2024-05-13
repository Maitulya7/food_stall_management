import React, { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  IconButton,
  Grid,
  Box,
  Paper,
  Divider,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import CloseIcon from '@mui/icons-material/Close';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import PersonIcon from '@mui/icons-material/Person';
import axios from 'axios';
import DEFAULT_URL from '../../../config';

const VendorOrder = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const accessToken = localStorage.getItem('access-token');
        const response = await axios.get(`${DEFAULT_URL}/api/v1/vendor/orders`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'ngrok-skip-browser-warning': true,
            'Content-Type': 'multipart/form-data',
          },
        });
  
        const sortedOrders = response.data.orders.sort((a, b) => {
          return new Date(b.created_at) - new Date(a.created_at);
        });
  
        const formattedOrders = sortedOrders.map(order => ({
          ...order,
          created_at: new Date(order.created_at).toLocaleString('en-GB', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          }),
        }));
  
        setOrders(formattedOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
  
    fetchOrders();
  }, []);
  

  const openModal = (order) => {
    setSelectedOrder(order);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedOrder(null);
  };

  const handlePreparationTime = async () => {
    // You can implement the logic here to post preparation time
    // For example:
    // const preparationTime = selectedOrder.preparing_time;
    // await axios.post(`${DEFAULT_URL}/api/v1/vendor/orders/${selectedOrder.id}/preparation-time`, { preparationTime });
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'customer_id', headerName: 'Customer ID', width: 150 },
    { field: 'payment_status', headerName: 'Payment Status', width: 180 },
    { field: 'amount_to_be_paid', headerName: 'Amount', width: 150 },
    { field: 'total_items', headerName: 'Total Items', width: 150 },
    { field: 'token_number', headerName: 'Token Number', width: 150 },
    { field: 'created_at', headerName: 'Created At', width: 250 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 250,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => openModal(params.row)}
          disabled={params.row.payment_status !== 'paid'}
          startIcon={<LocalDiningIcon />}
        >
          Set Preparation Time
        </Button>
      ),
    },
  ];

  const rows = orders.map((item, index) => ({
    id: index + 1,
    customer_id: item.customer_id,
    payment_status: item.payment_status,
    amount_to_be_paid: item.amount_to_be_paid,
    total_items: item.total_items,
    token_number: item.token_number,
    created_at: item.created_at,
    actions: 'Set Preparation Time',
  }));

  return (
    <div style={{ height: '500px', width: '100%' , overflow:"scroll"}}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          ...orders.initialState,
          pagination: { paginationModel: { pageSize: 5 } },
        }}
        pageSizeOptions={[5, 10, 25]}

      />

      <Dialog open={isModalOpen} onClose={closeModal} fullWidth maxWidth="sm">
        <DialogTitle>
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
            Order Details
          </Typography>
          <IconButton
            aria-label="close"
            onClick={closeModal}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {selectedOrder && (
            <Box>
              <Paper elevation={2} sx={{ padding: 2, borderRadius: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                      <PersonIcon fontSize="small" sx={{ marginRight: 1 }} />
                      {selectedOrder.customer_id}
                    </Typography>
                    <Typography variant="body1" color="textSecondary" gutterBottom>
                      <strong>Order ID:</strong> {selectedOrder.id}
                    </Typography>
                    <Divider sx={{ marginY: 1 }} />
                  </Grid>
                </Grid>
              </Paper>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal} color="primary" variant="contained">
            Close
          </Button>
          {selectedOrder && selectedOrder.status === 'paid' && (
            <Button onClick={handlePreparationTime} color="primary" variant="contained">
              Set Preparation Time
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default VendorOrder;
