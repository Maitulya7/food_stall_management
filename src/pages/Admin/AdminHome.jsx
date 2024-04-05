import React, { useState } from 'react';
import AdminSidebar from './components/AdminSidebar';
import AdminTopbar from './components/AdminTopbar';
import DashboardGrid from './components/Dashboard/DashboardGrid';
import { Grid, Typography } from '@mui/material';
import PendingRequestTable from './components/Request/PendingRequest/PendingRequestTable';
import ApproveRequestTable from './components/Request/ApproveRequest/ApproveRequestTable';
import RejectRequestTable from './components/Request/RejectRequest/RejectRequestTable';
import CategoryTable from './components/Category/CategoryTable'; 

const AdminHome = () => {
  const [selectedTab, setSelectedTab] = useState('pending');

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const pendingRequests = [
    {
      id: 1,
      email: 'john@example.com',
      firstName: 'John',
      lastName: 'Doe',
      phoneNumber: '123-456-7890',
      status: 'Pending',
      franchise: 'Franchise ABC',
      franchiseDetail: 'Details of Franchise ABC',
      categories: ['Category 1', 'Category 2']
    },
  ];

  const approvedRequests = [
    {
      id: 1,
      email: 'john@example.com',
      firstName: 'John',
      lastName: 'Doe',
      phoneNumber: '123-456-7890',
      status: 'Pending',
      franchise: 'Franchise ABC',
      franchiseDetail: 'Details of Franchise ABC',
      categories: ['Category 1', 'Category 2']
    },
  ];

  const rejectedRequests = [
    {
      id: 1,
      email: 'john@example.com',
      firstName: 'John',
      lastName: 'Doe',
      phoneNumber: '123-456-7890',
      status: 'Pending',
      franchise: 'Franchise ABC',
      franchiseDetail: 'Details of Franchise ABC',
      categories: ['Category 1', 'Category 2']
    },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <AdminSidebar style={{ height: '100vh' }} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <AdminTopbar pageTitle="Dashboard" />
        <div style={{ flexGrow: 1, padding: '20px', overflowX: 'auto' }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <DashboardGrid onTabChange={handleTabChange} />
            </Grid>
            {selectedTab === 'pending' && (
              <Grid item xs={12}>
                <Typography variant='h6'>Pending Request Table</Typography>
                <PendingRequestTable pendingRequests={pendingRequests} /> 
              </Grid>
            )}
            {selectedTab === 'approve' && (
              <Grid item xs={12}>
                <Typography variant='h6'>Approved Request Table</Typography>
                <ApproveRequestTable approvedRequests={approvedRequests} />
              </Grid>
            )}
            {selectedTab === 'reject' && (
              <Grid item xs={12}>
                <Typography variant='h6'>Rejected Request Table</Typography>
                <RejectRequestTable rejectedRequests={rejectedRequests} />
              </Grid>
            )}
            {selectedTab === 'categories' && (
              <Grid item xs={12}>
                <CategoryTable />
              </Grid>
            )}
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
