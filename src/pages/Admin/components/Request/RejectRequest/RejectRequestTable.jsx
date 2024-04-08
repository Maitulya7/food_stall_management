import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { Button, Popover, Typography , ListItem  , List} from '@mui/material';
import DEFAULT_URL from '../../../../../config';


const RejectRequestTable = () => {
  const [rejectedRequests, setRejectedRequests] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null); // State for popover anchor element
  const [popoverData, setPopoverData] = useState(null); // State for popover data

  const columns = [
    { field: 'srNo', headerName: 'Sr No', width: 100 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'first_name', headerName: 'First Name', width: 150 },
    { field: 'last_name', headerName: 'Last Name', width: 150 },
    { field: 'phone_number', headerName: 'Phone Number', width: 200 },
    { field: 'status', headerName: 'Status', width: 150 },
    { field: 'franchise', headerName: 'Franchise', width: 200 },
    { field: 'franchise_details', headerName: 'Franchise Detail', width: 200 },
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
  ];

  const handleClosePopover = () => {
    setAnchorEl(null);
    setPopoverData(null);
  };

  useEffect(() => {
    const token = localStorage.getItem('access-token');
    axios.get(`${DEFAULT_URL}/api/v1/admin/requests`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        const filteredRequests = res.data.requests.filter(request => request.status === 'rejected');
        setRejectedRequests(filteredRequests);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div style={{ height: 400, width: '100%'}}>
      <DataGrid
         rows={rejectedRequests.map((request, index) => ({ ...request, srNo: index + 1 }))}
        columns={columns}
        pageSize={5}
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

export default RejectRequestTable;
