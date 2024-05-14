import React, { useEffect, useState } from 'react';
import AdminSidebar from './components/AdminSidebar';
import AdminTopbar from './components/AdminTopbar';
import DashboardGrid from './components/Dashboard/DashboardGrid';
import { Grid, Typography } from '@mui/material';
import PendingRequestTable from './components/Request/PendingRequest/PendingRequestTable';
import ApproveRequestTable from './components/Request/ApproveRequest/ApproveRequestTable';
import RejectRequestTable from './components/Request/RejectRequest/RejectRequestTable';
import CategoryTable from './components/Category/CategoryTable'; 
import { useNavigate } from 'react-router-dom';

const AdminHome = () => {
  const [selectedTab, setSelectedTab] = useState('pending');
  const token = localStorage.getItem("access-token");
  console.log(token);
  const navigate = useNavigate()
  
  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  useEffect(()=>{
    if(token == null){
      navigate("/admin/login")
    }
  },[])


  return (
    <div style={{ display: 'flex', minHeight: '100vh' , overflow:"hidden" }}>
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
                <Typography variant='h6' sx={{marginBottom:2}}>Pending Request Table</Typography>
                <PendingRequestTable /> 
              </Grid>
            )}
            {selectedTab === 'approved' && (
              <Grid item xs={12}>
                <Typography variant='h6' sx={{marginBottom:2}}>Approved Request Table</Typography>
                <ApproveRequestTable  />
              </Grid>
            )}
            {selectedTab === 'rejected' && (
              <Grid item xs={12}>
                <Typography variant='h6' sx={{marginBottom:2}}>Rejected Request Table</Typography>
                <RejectRequestTable  />
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
