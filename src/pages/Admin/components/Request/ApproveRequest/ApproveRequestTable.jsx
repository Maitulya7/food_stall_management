import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Popover, Typography } from '@mui/material';

const ApproveRequestTable = ({ approvedRequests }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const columns = [
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'firstName', headerName: 'First Name', width: 150 },
    { field: 'lastName', headerName: 'Last Name', width: 150 },
    { field: 'phoneNumber', headerName: 'Phone Number', width: 150 },
    { field: 'status', headerName: 'Status', width: 150 },
    { field: 'franchise', headerName: 'Franchise', width: 200 },
    { field: 'franchiseDetail', headerName: 'Franchise Detail', width: 250 },
    {
      field: 'categories',
      headerName: 'Categories',
      width: 250,
      sortable: false,
      renderCell: (params) => (
        <div onMouseEnter={(event) => handlePopoverOpen(event, params.value)}>
          {params.value.join(', ')}
        </div>
      ),
    },
  ];

  const handlePopoverOpen = (event, categories) => {
    setAnchorEl(event.currentTarget);
    setSelectedCategories(categories);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setSelectedCategories([]);
  };

  return (
    <div style={{ height: 400, width: '100%', overflowX: 'auto' }}>
      <DataGrid
        rows={approvedRequests}
        columns={columns}
        pageSize={5}
        autoHeight
        disableColumnMenu
      />
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Typography style={{ padding: 10 }}>
          {selectedCategories.map((category, index) => (
            <span key={index}>
              {category}
              {index < selectedCategories.length - 1 && ', '}
            </span>
          ))}
        </Typography>
      </Popover>
    </div>
  );
};

export default ApproveRequestTable;
