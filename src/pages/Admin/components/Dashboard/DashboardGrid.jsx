import React, { useState } from 'react';
import { Grid } from '@mui/material';
import DashboardBox from './DashboardBox';
import { CheckCircleOutline, HourglassEmpty, HighlightOff, Category } from '@mui/icons-material';

const DashboardGrid = ({ onTabChange }) => {
  const [selectedTab, setSelectedTab] = useState('pending'); 

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
    onTabChange(tab);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3} onClick={() => handleTabClick('approved')} style={{ cursor: 'pointer' }}>
        <DashboardBox label="Approve" color="#4caf50" selected={selectedTab === 'approved'} icon={<CheckCircleOutline fontSize='large' />} />
      </Grid>
      <Grid item xs={12} sm={6} md={3} onClick={() => handleTabClick('pending')} style={{ cursor: 'pointer' }}>
        <DashboardBox label="Pending" color="#ff9800" selected={selectedTab === 'pending'} icon={<HourglassEmpty fontSize='large'/>} />
      </Grid>
      <Grid item xs={12} sm={6} md={3} onClick={() => handleTabClick('rejected')} style={{ cursor: 'pointer' }}>
        <DashboardBox label="Reject" color="#EB9196" selected={selectedTab === 'rejected'} icon={<HighlightOff fontSize='large' />} />
      </Grid>
      <Grid item xs={12} sm={6} md={3} onClick={() => handleTabClick('categories')} style={{ cursor: 'pointer' }}>
        <DashboardBox label="Category" color="#1976d2" selected={selectedTab === 'categories'} icon={<Category fontSize='large'/>} />
      </Grid>
    </Grid>
  );
};

export default DashboardGrid;
