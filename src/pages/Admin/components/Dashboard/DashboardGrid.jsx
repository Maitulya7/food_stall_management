import React from 'react';
import { Grid } from '@mui/material';
import DashboardBox from './DashboardBox';

const DashboardGrid = ({ onTabChange }) => {
  // Function to handle clicking on the Approve section
  const handleApproveClick = () => {
    onTabChange('approve');
  };

  // Function to handle clicking on the Pending section
  const handlePendingClick = () => {
    onTabChange('pending');
  };

  // Function to handle clicking on the Reject section
  const handleRejectClick = () => {
    onTabChange('reject');
  };
  
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3} onClick={handleApproveClick} style={{ cursor: 'pointer' }}>
        <DashboardBox label="Approve" value={10} color="#81c784" />
      </Grid>
      <Grid item xs={12} sm={6} md={3} onClick={handlePendingClick} style={{ cursor: 'pointer' }}>
        <DashboardBox label="Pending" value={5} color="#ffb74d" />
      </Grid>
      <Grid item xs={12} sm={6} md={3} onClick={handleRejectClick} style={{ cursor: 'pointer' }}>
        <DashboardBox label="Reject" value={3} color="#e57373" />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <DashboardBox label="Category" value={8} color="#64b5f6" />
      </Grid>
    </Grid>
  );
};

export default DashboardGrid;
