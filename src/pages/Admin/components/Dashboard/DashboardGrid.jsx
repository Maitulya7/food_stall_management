import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import DashboardBox from './DashboardBox';
import axios from 'axios';

const DashboardGrid = ({ onTabChange }) => {
  const [selectedTab, setSelectedTab] = useState('pending'); 
  const [categoriesCount, setCategoriesCount] = useState(0);


  useEffect(()=>{
    fetchData()
  },[])

  const fetchData = () => {
    axios.get('http://localhost:3000/api/v1/admin/categories')
      .then(response => {
        const categories = response.data.categories
        setCategoriesCount(categories.length);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  };


  // Function to handle clicking on a tab
  const handleTabClick = (tab) => {
    setSelectedTab(tab);
    onTabChange(tab);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3} onClick={() => handleTabClick('approve')} style={{ cursor: 'pointer' }}>
        <DashboardBox label="Approve" value={10} color="#4caf50" selected={selectedTab === 'approve'} />
      </Grid>
      <Grid item xs={12} sm={6} md={3} onClick={() => handleTabClick('pending')} style={{ cursor: 'pointer' }}>
        <DashboardBox label="Pending" value={5} color="#ff9800" selected={selectedTab === 'pending'} />
      </Grid>
      <Grid item xs={12} sm={6} md={3} onClick={() => handleTabClick('reject')} style={{ cursor: 'pointer' }}>
        <DashboardBox label="Reject" value={3} color="#EB9196" selected={selectedTab === 'reject'} />
      </Grid>
      <Grid item xs={12} sm={6} md={3} onClick={() => handleTabClick('categories')} style={{ cursor: 'pointer' }}>
        <DashboardBox label="categories" value={categoriesCount} color="#1976d2" selected={selectedTab === 'categories'} />
      </Grid>
    </Grid>
  );
};

export default DashboardGrid;
