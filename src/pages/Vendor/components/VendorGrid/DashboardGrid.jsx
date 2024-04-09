import React, { useState } from 'react';
import { Grid } from '@mui/material';
import DashboardBox from './DashoboardBox';
import { ShoppingCart } from '@mui/icons-material';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import EqualizerIcon from '@mui/icons-material/Equalizer';

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
        <DashboardBox label="Bills" color="#EB9196" selected={selectedTab === 'Bills'} icon={<MonetizationOnIcon fontSize='large' />} />
      </Grid>
      <Grid item xs={12} sm={6} md={3} onClick={() => handleTabClick('Analysis')} style={{ cursor: 'pointer' }}>
        <DashboardBox label="Analysis" color="#1976d2" selected={selectedTab === 'Analysis'} icon={<EqualizerIcon  fontSize='large'/>} />
      </Grid>
    </Grid>
  );
};

export default DashboardGrid;
