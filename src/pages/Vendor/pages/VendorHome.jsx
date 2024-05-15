import React, { useEffect, useState } from 'react'
import VendorSidebar from '../components/VendorSidebar'
import { Grid, Typography } from '@mui/material';
import VendorTopbar from '../components/VendorTopbar'
import DashboardGrid from '../components/VendorGrid/DashboardGrid';
import MenuTable from '../components/Menu/MenuTable';
import { useNavigate } from 'react-router-dom';
import VendorAnalysis from '../components/VendorAnalysis';
import VendorOrder from '../components/VendorOrder';
import VendorOrderHistory from '../components/VendorOrderHistory';

function VendorHome() {
  const [selectedTab, setSelectedTab] = useState('Order');
  const token = localStorage.getItem("access-token");
  const navigate = useNavigate()

  useEffect(()=>{
    if(token == null)
      navigate("/vendor/login")
    
  },[])
  
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
            {selectedTab === 'Order' && (
              <Grid item xs={12}>
                <Typography variant='h6'>Order Table</Typography>
                <VendorOrder/>
              </Grid>
            )}
            {selectedTab === 'Menu' && (
              <Grid item xs={12}>
                <Typography variant='h6'>Menu Table</Typography>
                <MenuTable/>
              </Grid>
            )}
            {selectedTab === 'Order History' && (
              <Grid item xs={12}>
                <Typography variant='h6'>Bills  Table</Typography>
                <VendorOrderHistory/>
              </Grid>
            )}
            {selectedTab === 'Analysis' && (
              <Grid item xs={12}>
                <VendorAnalysis/>
              </Grid>
            )}
          </Grid>
        </div>
      </div>
    </div>
  )
}

export default VendorHome