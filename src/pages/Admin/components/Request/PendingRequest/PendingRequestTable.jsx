import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { Button, Popover, Typography, ListItem, List, IconButton  , Modal, Box} from '@mui/material'; // Importing Popover and Typography
import DEFAULT_URL from '../../../../../config';
import InfoIcon from '@mui/icons-material/Info'; 
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import VisibilityIcon from '@mui/icons-material/Visibility';

const PendingRequestTable = () => {
  const [pendingRequest, setPendingRequest] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null); // State for popover anchor element
  const [popoverData, setPopoverData] = useState(null); // State for popover data
  const [selectedImageUrl, setSelectedImageUrl] = useState(''); 
  const [openImageModal, setOpenImageModal] = useState(false);
  const [details , setDetails] = useState('')
  const [openDetailModal , setOpenDetailModal] = useState(false)


  const columns = [
    { field: 'srNo', headerName: 'Sr No', width: 100 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'first_name', headerName: 'First Name', width: 150, flex: 1, overflow: 'hidden' }, // Adjusted width and overflow
    { field: 'last_name', headerName: 'Last Name', width: 150, flex: 1, overflow: 'hidden' },
    { field: 'stall_name', headerName: 'Stall Name', width: 150, flex: 1, overflow: 'hidden' }, // Adjusted width and overflow
    { field: 'phone_number', headerName: 'Phone Number', width: 150 },
    { field: 'status', headerName: 'Status', width: 150 },
    { field: 'franchise', headerName: 'Franchise', width: 150 },
    { field: 'franchise_details', headerName: 'Franchise Detail', width: 150, flex: 1.2, overflow: 'hidden',
      renderCell: (params) => (
        <IconButton onClick={() => handleViewFranchiseDetails(params.row.franchise_details)}>
          <InfoIcon color='secondary' />
        </IconButton>
      )
    },
    {
      field: 'stall_logo',
      headerName: 'Stall Logo',
      width: 150,
      renderCell: (params) => (
        <IconButton color="primary" onClick={() => handleViewLogo(params.row.stall_logo_url)}>
          <VisibilityIcon />
        </IconButton>
      )
    },
    {
      field: 'type_of_categories',
      headerName: 'Categories',
      width: 150,
      sortable: false,
      renderCell: (params) => {
        const handleClick = (event) => {
          setAnchorEl(event.currentTarget); // Setting anchor element for popover
          setPopoverData(params.row.type_of_categories); // Setting popover data
        };

        return (
          <div>
            <Button onClick={handleClick}>View</Button> {/* Button to trigger popover */}
          </div>
        );
      }
    },
    {
      field: 'approve',
      headerName: 'Approve',
      width: 100,
      sortable: false,
      renderCell: (params) => {
        const handleApprove = () => {
          axios.post(`${DEFAULT_URL}/api/v1/admin/approve_request/${params.row.id}`, {}, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('access-token')}`,
            }
          }).then((res) => {
            fetchPendingRequest();
          }).catch((err) => {
            console.log(err.message)
          })
        };

        return (
          <IconButton onClick={() => handleApprove(params.row.id)}>
          <CheckCircleIcon color='success' />
        </IconButton>
        );
      }
    },
    {
      field: 'reject',
      headerName: 'Reject',
      width: 100,
      sortable: false,
      renderCell: (params) => {
        const handleReject = () => {
          axios.post(`${DEFAULT_URL}/api/v1/admin/reject_request/${params.row.id}`, {}, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('access-token')}`,
            },
          })
            .then((res) => {
              fetchPendingRequest();
            })
            .catch((err) => {
              console.error('Error rejecting request:', err);
            });
        };

        return (
          <IconButton onClick={() => handleReject(params.row.id)}>
          <CancelIcon color='error' fontSize='lg' />
        </IconButton>
        );
      }
    }
  ];
  const handleViewFranchiseDetails = (details) => {
    setDetails(details)
    setOpenDetailModal(true)
  };

  const handleDetailCloseModal = () => {
    setOpenDetailModal(false)
  }

  const handleViewLogo = (logoUrl) => {
    setSelectedImageUrl(logoUrl);
    setOpenImageModal(true);
  };

  const handleImageCloseModal = () => {
    setOpenImageModal(false);
  };

  



  const token = localStorage.getItem('access-token');
  const fetchPendingRequest = () => {
    axios.get(`${DEFAULT_URL}/api/v1/admin/requests`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "ngrok-skip-browser-warning": true,
      },
    })
      .then((res) => {
        const filteredRequests = res.data.requests.filter(request => request.status === 'pending');
        setPendingRequest(filteredRequests);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
    setPopoverData(null);
  };

  useEffect(() => {
    fetchPendingRequest();
  }, []);

  return (
    <div style={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={pendingRequest.map((request, index) => ({ ...request, srNo: index + 1 }))}
        columns={columns}
        pageSize={10}
        autoHeight
        disableColumnMenu
      />
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
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
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, width: 400 }}>
          <img src={selectedImageUrl} alt="Stall Logo" style={{ maxWidth: '100%', height: 'auto' }} />
        </Box>
      </Modal>

      <Modal open={openDetailModal} onClose={handleDetailCloseModal}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, width: 400 }}>
          <Typography>{details}</Typography>
        </Box>
      </Modal>

    </div>
  );
};

export default PendingRequestTable;
