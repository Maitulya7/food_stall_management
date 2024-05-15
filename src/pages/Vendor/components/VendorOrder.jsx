import React, { useEffect, useState } from "react";
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
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { DataGrid } from "@mui/x-data-grid";
import CloseIcon from "@mui/icons-material/Close";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import axios from "axios";
import DEFAULT_URL from "../../../config";

const VendorOrder = () => {
  const [orders, setOrders] = useState([]);
  const [isFoodItemDetailModalOpen, setFoodItemDetailModalOpen] =
    useState(false);
  const [foodItemDetail, setFoodItemDetail] = useState(null);

  const [gridKey, setGridKey] = useState(0); // Add state for grid key
  const [filteredAndSortedOrders, setFilteredAndSortedOrders] = useState([]);

  const updateFilteredAndSortedOrders = (orders) => {
    const filteredOrders = orders.filter(item => item.status === 'pending' || item.status === 'approved');

    const sortedOrders = filteredOrders.sort((a, b) => {
        return new Date(b.created_at) - new Date(a.created_at);
    });

    setFilteredAndSortedOrders(sortedOrders);
};

useEffect(() => {
  updateFilteredAndSortedOrders(orders);
}, [orders]); 

  // Function to update grid key
  const updateGridKey = () => {
    setGridKey((prevKey) => prevKey + 1);
  };

  const fetchOrders = async () => {
    try {
      const accessToken = localStorage.getItem("access-token");
      const response = await axios.get(`${DEFAULT_URL}/api/v1/vendor/orders`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "ngrok-skip-browser-warning": true,
        },
      });

      const sortedOrders = response.data.orders.sort((a, b) => {
        return new Date(b.created_at) - new Date(a.created_at);
      });

      const formattedOrders = sortedOrders.map((order) => ({
        ...order,
        created_at: new Date(order.created_at).toLocaleString("en-GB", {
          day: "numeric",
          month: "numeric",
          year: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
      }));

      setOrders(formattedOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const openFoodItemDetailModal = (foodItemDetail) => {
    setFoodItemDetail(foodItemDetail);
    setFoodItemDetailModalOpen(true);
  };

  const closeFoodItemDetailModal = () => {
    setFoodItemDetailModalOpen(false);
    setFoodItemDetail(null);
  };

  const handlePreparingOrder = (orderId) => {
    const accessToken = localStorage.getItem("access-token");

    axios
      .put(
        `${DEFAULT_URL}/api/v1/vendor/orders/${orderId}/preparing_order`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        fetchOrders();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCompleteOrder = (orderId) => {
    const accessToken = localStorage.getItem("access-token");
    axios
      .put(
        `${DEFAULT_URL}/api/v1/vendor/orders/${orderId}/ready_for_delivery_order`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        fetchOrders();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleApproveOrder = (orderId) => {
    const accessToken = localStorage.getItem("access-token");
    axios
      .put(
        `${DEFAULT_URL}/api/v1/vendor/orders/${orderId}/accept_order`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        fetchOrders();
        updateGridKey();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRejectOrder = (orderId) => {
    const accessToken = localStorage.getItem("access-token");
    axios
      .put(
        `${DEFAULT_URL}/api/v1/vendor/orders/${orderId}/reject_order`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        fetchOrders();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const columns = [
    { field: "id", headerName: "Sr.No", width: 100 },
    { field: "customer_name", headerName: "Customer Name", width: 200 },
    { field: "payment_status", headerName: "Payment Status", width: 180 },
    { field: "amount_to_be_paid", headerName: "Amount", width: 150 },
    { field: "total_items", headerName: "Total Items", width: 150 },
    { field: "token_number", headerName: "Token Number", width: 150 },
    { field: "created_at", headerName: "Created At", width: 200 },
    {
      field: "food_items_details",
      headerName: "Food Detail",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => openFoodItemDetailModal(params.row.food_item_detail)}
          startIcon={<LocalDiningIcon />}
        >
          Open
        </Button>
      ),
    },
    {
      field: "approve_order",
      headerName: "Approve",
      width: 100,
      renderCell: (params) => (
        <IconButton
          color="primary"
          onClick={() => handleApproveOrder(params.row.orderId)}
        >
          <CheckCircleIcon />
        </IconButton>
      ),
    },
    {
      field: "reject_order",
      headerName: "Reject",
      width: 100,
      renderCell: (params) => (
        <IconButton
          color="secondary"
          onClick={() => handleRejectOrder(params.row.orderId)}
        >
          <CloseIcon />
        </IconButton>
      ),
    },
    {
      field: "preparing_order",
      headerName: "Start Cooking",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handlePreparingOrder(params.row.orderId)}
          startIcon={<LocalDiningIcon />}
        >
          Start
        </Button>
      ),
    },
    {
      field: "ready_to_deliver",
      headerName: "Order Ready",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleCompleteOrder(params.row.orderId)}
          startIcon={<LocalDiningIcon />}
        >
          Ready
        </Button>
      ),
    },
  ];

  const rows = filteredAndSortedOrders
    .map((item, index) => {
      if (item.status === "pending") {
        return {
          id: index + 1,
          orderId: item.id,
          customer_name: item.customer_name,
          payment_status: item.payment_status,
          amount_to_be_paid: item.amount_to_be_paid,
          total_items: item.total_items,
          token_number: item.token_number,
          created_at: item.created_at,
          food_item_detail: item.food_items_details,
          preparing_order: "Cooking",
          ready_to_deliver: "Ready",
          status: "pending", // added status field
        };
      } else if (item.status === "approved") {
        return {
          id: index + 1,
          orderId: item.id,
          customer_name: item.customer_name,
          payment_status: item.payment_status,
          amount_to_be_paid: item.amount_to_be_paid,
          total_items: item.total_items,
          token_number: item.token_number,
          created_at: item.created_at,
          food_item_detail: item.food_items_details,
          preparing_order: "Cooking",
          ready_to_deliver: "Ready",
          status: "approved", // added status field
        };
      } else {
        return null; // If status is rejected or any other, exclude from the list
      }
    })
    .filter(Boolean); // Filter out null values

  return (
    <div style={{ height: "400px", width: "100%", overflow: "hidden" }}>
      <DataGrid
        key={gridKey}
        rows={rows}
        columns={columns}
        getRowClassName={(params) =>
          params.row.status ? `status-${params.row.status}` : ""
        }
        sx={{
          "& .status-pending": {
            backgroundColor: "#FFEBCD", // very light orange color for pending status
          },
          "& .status-approved": {
            backgroundColor: "#c5e1a5",
          },
          "& .status-rejected": {
            display: "none", // hide rows with rejected status
          },
        }}
        initialState={{
          ...orders.initialState,
          pagination: { paginationModel: { pageSize: 5 } },
        }}
        pageSizeOptions={[5, 10, 25]}
      />

      <Dialog
        open={isFoodItemDetailModalOpen}
        onClose={closeFoodItemDetailModal}
      >
        <DialogTitle>
          <Typography
            variant="h6"
            sx={{ display: "flex", alignItems: "center" }}
          >
            Order Details
          </Typography>
          <IconButton
            aria-label="close"
            onClick={closeFoodItemDetailModal}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          {foodItemDetail && (
            <Box>
              <Paper elevation={2} sx={{ padding: 4, borderRadius: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Box sx={{ maxHeight: 400, overflowY: "auto" }}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Amount</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {foodItemDetail?.map((item, index) => (
                            <TableRow key={index}>
                              <TableCell>{item.name}</TableCell>
                              <TableCell>{item.category}</TableCell>
                              <TableCell>{item.quantity}</TableCell>
                              <TableCell>{item.amount}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Box>
                    <Divider sx={{ marginY: 1 }} />
                  </Grid>
                </Grid>
              </Paper>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VendorOrder;
