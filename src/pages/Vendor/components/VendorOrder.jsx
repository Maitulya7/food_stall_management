import React, { useState } from 'react';
import {
  Button,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  IconButton,
  Grid,
  Box,
  Paper,
  Divider
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import CloseIcon from '@mui/icons-material/Close';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PersonIcon from '@mui/icons-material/Person';
import ArchiveIcon from '@mui/icons-material/Archive';

const VendorOrder = () => {
  const initialOrders = [
    {
      id: 1,
      orderId: '001',
      customerName: 'Maitulya',
      status: 'Not Ready',
      paymentStatus: 'Paid',
      foodName: 'Pizza',
      quantity: 2,
      tag: 'Veg',
      taste: 'Spicy',
      price: 10.0,
    },
    {
      id: 2,
      orderId: '002',
      customerName: 'Luffy',
      status: 'Not Ready',
      paymentStatus: 'Unpaid',
      foodName: 'Burger',
      quantity: 1,
      tag: 'Non-Veg',
      taste: 'Mild',
      price: 8.5,
    },
    {
      id: 3,
      orderId: '003',
      customerName: 'Zoro',
      status: 'Not Ready',
      paymentStatus: 'Paid',
      foodName: 'Pasta',
      quantity: 3,
      tag: 'Veg',
      taste: 'Sweet',
      price: 12.0,
    },
    {
      id: 4,
      orderId: '004',
      customerName: 'Naruto',
      status: 'Not Ready',
      paymentStatus: 'Paid',
      foodName: 'Pasta',
      quantity: 3,
      tag: 'Veg',
      taste: 'Sweet',
      price: 12.0,
    },
    {
      id: 5,
      orderId: '005',
      customerName: 'Goku',
      status: 'Not Ready',
      paymentStatus: 'Paid',
      foodName: 'Pasta',
      quantity: 3,
      tag: 'Veg',
      taste: 'Sweet',
      price: 12.0,
    },
  ];

  const [orders, setOrders] = useState(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = (order) => {
    setSelectedOrder(order);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedOrder(null);
  };

  const columns = [
    { field: 'orderId', headerName: 'Order ID', width: 200 },
    { field: 'customerName', headerName: 'Customer Name', width: 200 },
    { field: 'paymentStatus', headerName: 'Payment Status', width: 200 },
    {
      field: 'status',
      headerName: 'Status',
      width: 200,
      renderCell: (params) => (
        <Select
          value={params.value}
          variant="outlined"
          size="small"
        >
          <MenuItem value="Not Ready">Not Ready</MenuItem>
          <MenuItem value="Ready">Ready</MenuItem>
        </Select>
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => openModal(params.row)}
          startIcon={<LocalDiningIcon />}
        >
          View Details
        </Button>
      ),
    },

  ];

  return (
    <div style={{ height: 'auto', width: '100%' }}>
      <DataGrid
        rows={orders}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        style={{ marginBottom: '20px' }}
        autoHeight
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
                      {selectedOrder.customerName}
                    </Typography>
                    <Typography variant="body1" color="textSecondary" gutterBottom>
                      <strong>Order ID:</strong> {selectedOrder.orderId}
                    </Typography>
                    <Divider sx={{ marginY: 1 }} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body1" component="div" sx={{ display: 'flex', alignItems: 'center' }}>
                      <FoodBankIcon fontSize="small" sx={{ marginRight: 1 }} />
                      <strong>Food Name:</strong> {selectedOrder.foodName}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body1" component="div" sx={{ display: 'flex', alignItems: 'center' }}>
                      <strong>Quantity:</strong> {selectedOrder.quantity}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body1" component="div" sx={{ display: 'flex', alignItems: 'center' }}>
                      <strong>Tag:</strong> {selectedOrder.tag}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body1" component="div" sx={{ display: 'flex', alignItems: 'center' }}>
                      <strong>Taste:</strong> {selectedOrder.taste}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body1" component="div" sx={{ display: 'flex', alignItems: 'center' }}>
                      <MonetizationOnIcon fontSize="small" sx={{ marginRight: 1 }} />
                      <strong>Price:</strong> ${selectedOrder.price.toFixed(2)}
                    </Typography>
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
        </DialogActions>
      </Dialog>

    </div>
  );
};

export default VendorOrder;
