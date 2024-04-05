import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const PendingRequestTable = ({ pendingRequests }) => {
  const columns = [
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'firstName', headerName: 'First Name', width: 150 },
    { field: 'lastName', headerName: 'Last Name', width: 150 },
    { field: 'phoneNumber', headerName: 'Phone Number', width: 150 },
    { field: 'status', headerName: 'Status', width: 150 },
    { field: 'franchise', headerName: 'Franchise', width: 200 },
    { field: 'franchiseDetail', headerName: 'Franchise Detail', width: 250 },
    { field: 'categories', headerName: 'Categories', width: 250, sortable: false },
  ];

  return (
    <div style={{ height: 400, width: '100%', overflowX: 'auto' }}>
      <DataGrid
        rows={pendingRequests}
        columns={columns}
        pageSize={5}
        autoHeight
        disableColumnMenu
      />
    </div>
  );
};

export default PendingRequestTable;
