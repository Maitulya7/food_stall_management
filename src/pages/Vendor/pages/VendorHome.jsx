import React, { useState } from 'react'
import VendorSidebar from '../components/VendorSidebar'
import { Grid, Typography } from '@mui/material';
import VendorTopbar from '../components/VendorTopbar'
import DashboardGrid from '../components/VendorGrid/DashboardGrid';
import MenuTable from '../components/Menu/MenuTable';

function VendorHome() {
  const [selectedTab, setSelectedTab] = useState('Oders');
  
  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <VendorSidebar style={{ height: '100vh' }} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <VendorTopbar pageTitle="Dashboard" />
        <div style={{ flexGrow: 1, padding: '20px', overflowX: 'auto' }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <DashboardGrid onTabChange={handleTabChange} />
            </Grid>
            {selectedTab === 'Oder' && (
              <Grid item xs={12}>
                <Typography variant='h6'>Oder Table</Typography>
              </Grid>
            )}
            {selectedTab === 'Menu' && (
              <Grid item xs={12}>
                <Typography variant='h6'>Menu Table</Typography>
                <MenuTable/>
              </Grid>
            )}
            {selectedTab === 'Bills' && (
              <Grid item xs={12}>
                <Typography variant='h6'>Bills  Table</Typography>
              </Grid>
            )}
            {selectedTab === 'Analysis' && (
              <Grid item xs={12}>
              </Grid>
            )}
          </Grid>
        </div>
      </div>
    </div>
  )
}

export default VendorHome