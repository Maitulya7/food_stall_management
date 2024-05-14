import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import {
  Button,
  Popover,
  Typography,
  ListItem,
  List,
  IconButton,
  Modal,
  Box,
  CircularProgress,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DEFAULT_URL from "../../../../../config";

const ApproveRequestTable = ({ approvedRequests }) => {
  const [approveRequests, setApprovRequests] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [anchorEl, setAnchorEl] = useState(null); // State for popover anchor element
  const [popoverData, setPopoverData] = useState(null); // State for popover data
  const [selectedImageUrl, setSelectedImageUrl] = useState("");
  const [openImageModal, setOpenImageModal] = useState(false);
  const [details, setDetails] = useState("");
  const [openDetailModal, setOpenDetailModal] = useState(false);

  const columns = [
    { field: "srNo", headerName: "Sr No", width: 80 },
    { field: "email", headerName: "Email", width: 250 },
    {
      field: "first_name",
      headerName: "First Name",
      width: 150,
      flex: 1,
      overflow: "hidden",
    }, // Adjusted width and overflow
    {
      field: "last_name",
      headerName: "Last Name",
      width: 150,
      flex: 1,
      overflow: "hidden",
    },
    {
      field: "stall_name",
      headerName: "Stall Name",
      width: 150,
      flex: 1,
      overflow: "hidden",
    }, // Adjusted width and overflow
    { field: "phone_number", headerName: "Phone Number", width: 150 },
    { field: "status", headerName: "Status", width: 150 },
    { field: "franchise", headerName: "Franchise", width: 150 },
    {
      field: "franchise_details",
      headerName: "Franchise Detail",
      width: 150,
      flex: 1.2,
      overflow: "hidden",
      renderCell: (params) => (
        <IconButton
          onClick={() =>
            handleViewFranchiseDetails(params.row.franchise_details)
          }
        >
          <InfoIcon color="secondary" />
        </IconButton>
      ),
    },
    {
      field: "stall_logo",
      headerName: "Stall Logo",
      width: 150,
      renderCell: (params) => (
        <IconButton
          color="primary"
          onClick={() => handleViewLogo(params.row.stall_logo_url)}
        >
          <VisibilityIcon />
        </IconButton>
      ),
    },
    {
      field: "type_of_categories",
      headerName: "Categories",
      width: 150,
      sortable: false,
      renderCell: (params) => {
        const handleClick = (event) => {
          setAnchorEl(event.currentTarget);
          setPopoverData(params.row.type_of_categories);
        };

        return (
          <div>
            <Button onClick={handleClick}>View</Button>{" "}
            {/* Button to trigger popover */}
          </div>
        );
      },
    },
  ];

  const handleViewLogo = (logoUrl) => {
    setSelectedImageUrl(logoUrl);
    setOpenImageModal(true);
  };

  const handleDetailCloseModal = () => {
    setOpenDetailModal(false);
  };

  const handleImageCloseModal = () => {
    setOpenImageModal(false);
  };

  const handleViewFranchiseDetails = (details) => {
    setDetails(details);
    setOpenDetailModal(true);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
    setPopoverData(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("access-token");
    axios
      .get(`${DEFAULT_URL}/api/v1/admin/requests`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": true,
        },
      })
      .then((res) => {
        const filteredRequests = res.data.requests.filter(
          (request) => request.status === "approved"
        );
        const sortedFilteredRequests = filteredRequests.sort((a, b) => {
          return new Date(b.created_at) - new Date(a.created_at);
        });
        setApprovRequests(sortedFilteredRequests);
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((err) => {
        console.log(err);
        setLoading(false); // Set loading to false in case of error
      });
  }, []);

  return (
    <div
      style={{
        position: "relative",
        height: 400,
        width: "100%",
        overflowX: "auto",
      }}
    >
      {loading && ( // Render loader if loading is true
        <CircularProgress
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      )}
      {!loading && ( // Render data grid if loading is false
        <DataGrid
          rows={approveRequests.map((request, index) => ({
            ...request,
            srNo: index + 1,
          }))}
          columns={columns}
          pageSize={5}
          height={400}
          disableColumnMenu
          initialState={{
            ...approveRequests.initialState,
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          pageSizeOptions={[5, 10, 25]}
        />
      )}

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {popoverData ? (
          <div sx={{ p: 2 }}>
            <List sx={{ p: 0, m: 0 }}>
              {popoverData.map((category, index) => (
                <ListItem key={index} sx={{ mb: 1 }}>
                  <Typography>{category}</Typography>
                </ListItem>
              ))}
            </List>
          </div>
        ) : (
          <Typography sx={{ p: 2 }}>No categories available</Typography>
        )}
      </Popover>

      <Modal open={openImageModal} onClose={handleImageCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            width: 400,
          }}
        >
          <img
            src={selectedImageUrl}
            alt="Stall Logo"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </Box>
      </Modal>

      <Modal open={openDetailModal} onClose={handleDetailCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            width: 400,
          }}
        >
          <Typography>{details}</Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default ApproveRequestTable;
