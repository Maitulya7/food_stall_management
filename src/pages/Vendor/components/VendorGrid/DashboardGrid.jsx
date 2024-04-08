import React, { useState } from 'react';
import { Grid } from '@mui/material';
import DashboardBox from './DashoboardBox';
import { ShoppingCart, Receipt, AccountCircle } from '@mui/icons-material';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';

const DashboardGrid = ({ onTabChange }) => {
  const [selectedTab, setSelectedTab] = useState('Oder'); 

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
    onTabChange(tab);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3} onClick={() => handleTabClick('Oder')} style={{ cursor: 'pointer' }}>
        <DashboardBox label="Oder" color="#4caf50" selected={selectedTab === 'Oder'} icon={<ShoppingCart fontSize='large' />} />
      </Grid>
      <Grid item xs={12} sm={6} md={3} onClick={() => handleTabClick('Menu')} style={{ cursor: 'pointer' }}>
        <DashboardBox label="Menu" color="#ff9800" selected={selectedTab === 'Menu'} icon={<RestaurantMenuIcon  fontSize='large'/>} />
      </Grid>
      <Grid item xs={12} sm={6} md={3} onClick={() => handleTabClick('Bills')} style={{ cursor: 'pointer' }}>
        <DashboardBox label="Bills" color="#EB9196" selected={selectedTab === 'Bills'} icon={<Receipt fontSize='large' />} />
      </Grid>
      <Grid item xs={12} sm={6} md={3} onClick={() => handleTabClick('Profile')} style={{ cursor: 'pointer' }}>
        <DashboardBox label="Profile" color="#1976d2" selected={selectedTab === 'Profile'} icon={<AccountCircle  fontSize='large'/>} />
      </Grid>
    </Grid>
  );
};

export default DashboardGrid;
