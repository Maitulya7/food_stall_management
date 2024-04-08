import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import DashboardBox from './DashboardBox';
import axios from 'axios';
import DEFAULT_URL from '../../../../config';


const DashboardGrid = ({ onTabChange }) => {
  const [selectedTab, setSelectedTab] = useState('pending'); 
  const [categoriesCount, setCategoriesCount] = useState(0);
  const [approvedRequestLenght , setApproveRequestLength] = useState('')
  const [pendingRequestLenght , setPendingRequestLenght] = useState('');
  const [rejectRequestLenght , setRejectRequestLenght] = useState('')


  useEffect(()=>{
     fetchRequestTableData()
    fetchCategoryData()
   
  },[])

  const fetchCategoryData = () => {
    axios.get(`${DEFAULT_URL}/api/v1/admin/categories`)
      .then(response => {
        const categories = response.data.categories
        console.log(categories)
        setCategoriesCount(categories.length);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  };

  const fetchRequestTableData = () => {
    axios.get(`${DEFAULT_URL}/api/v1/admin/requests`,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access-token')}`,
      }
    }).then((res)=>{
      const requests = res.data.requests;
      const approveCount = requests.filter(request => request.status === 'approved').length;
      setApproveRequestLength(approveCount)
      const pendingCount = requests.filter(request => request.status === 'pending').length;
      setPendingRequestLenght(pendingCount)
      const rejectCount = requests.filter(request => request.status === 'rejected').length;
      setRejectRequestLenght(rejectCount)
    }).catch((err)=>{
      console.log(err)
    })
  }
  
  const handleTabClick = (tab) => {
    setSelectedTab(tab);
    onTabChange(tab);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3} onClick={() => handleTabClick('approve')} style={{ cursor: 'pointer' }}>
        <DashboardBox label="Approve" value={approvedRequestLenght} color="#4caf50" selected={selectedTab === 'approve'} />
      </Grid>
      <Grid item xs={12} sm={6} md={3} onClick={() => handleTabClick('pending')} style={{ cursor: 'pointer' }}>
        <DashboardBox label="Pending" value={pendingRequestLenght} color="#ff9800" selected={selectedTab === 'pending'} />
      </Grid>
      <Grid item xs={12} sm={6} md={3} onClick={() => handleTabClick('reject')} style={{ cursor: 'pointer' }}>
        <DashboardBox label="Reject" value={rejectRequestLenght} color="#EB9196" selected={selectedTab === 'reject'} />
      </Grid>
      <Grid item xs={12} sm={6} md={3} onClick={() => handleTabClick('categories')} style={{ cursor: 'pointer' }}>
        <DashboardBox label="categories" value={categoriesCount} color="#1976d2" selected={selectedTab === 'categories'} />
      </Grid>
    </Grid>
  );
};

export default DashboardGrid;
