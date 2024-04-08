import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { Button, Popover, Typography , ListItem  , List} from '@mui/material'; // Importing Popover and Typography
import DEFAULT_URL from '../../../../../config';

const PendingRequestTable = () => {
  const [pendingRequest, setPendingRequest] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null); // State for popover anchor element
  const [popoverData, setPopoverData] = useState(null); // State for popover data
  

  const columns = [
    { field: 'srNo', headerName: 'Sr No', width: 100 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'first_name', headerName: 'First Name', width: 150 },
    { field: 'last_name', headerName: 'Last Name', width: 150 },
    { field: 'phone_number', headerName: 'Phone Number', width: 200 },
    { field: 'status', headerName: 'Status', width: 150 },
    { field: 'franchise', headerName: 'Franchise', width: 150 },
    { field: 'franchise_details', headerName: 'Franchise Detail', width: 150 },
    {
      field: 'type_of_categories',
      headerName: 'Categories',
      width: 160,
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
      width: 160,
      sortable: false,
      renderCell: (params) => {
        const handleApprove = () => {
          axios.post(`${DEFAULT_URL}/api/v1/admin/approve_request/${params.row.id}`, {} , {
            headers:{
              Authorization: `Bearer ${localStorage.getItem('access-token')}`,
            }
          }).then((res)=>{
            fetchPendingRequest();
          }).catch((err)=>{
            console.log(err.message)
          })
        };
  
        return (
          <Button onClick={handleApprove} variant="contained" color="primary">
            Approve
          </Button>
        );
      }
    },
    {
      field: 'reject',
      headerName: 'Reject',
      width: 160,
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
          <Button onClick={handleReject} variant="contained" color="secondary">
            Reject
          </Button>
        );
      }
    }
  ];



  const token = localStorage.getItem('access-token');
  const fetchPendingRequest = () => {
    axios.get(`${DEFAULT_URL}/api/v1/admin/requests`, {
      headers: {
        Authorization: `Bearer ${token}`,
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


    </div>
  );
};

export default PendingRequestTable;
