import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Grid,
  Box,
  Typography,
  Paper,
  Button,
  Popover,
  List,
  ListItem,
  ListItemText,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';
import DEFAULT_URL from '../../../../config';
import { Link } from 'react-router-dom';

const CustomerStall = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedVendor, setSelectedVendor] = useState(null);

  const openPopover = (event, vendor) => {
    setAnchorEl(event.currentTarget);
    setSelectedVendor(vendor);
  };

  const closePopover = () => {
    setAnchorEl(null);
    setSelectedVendor(null);
  };

  useEffect(() => {
    const fetchVendors = async () => {
      const token = localStorage.getItem('access-token');
      try {
        const response = await axios.get(`${DEFAULT_URL}/api/v1/customer/categories`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const allVendors = response.data.categories.flatMap(category => category.vendors);
        const uniqueVendors = Array.from(new Set(allVendors.map(vendor => vendor.id)))
          .map(id => allVendors.find(v => v.id === id));

        setVendors(uniqueVendors);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setLoading(false);
      }
    };

    fetchVendors();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (vendors.length === 0) {
    return <div>No vendors available</div>;
  }
  

  return (

    <Grid container marginTop={1} spacing={2}>
      {vendors.map(vendor => (
        
        <Grid item key={vendor.id} xs={12} sm={6} md={4} lg={3}>
          <Card sx={{
            height: '100%', display: 'flex',borderRadius:"8px", cursor:"pointer" ,flexDirection: 'column', transition: 'transform 0.2s ease-in-out',
            '&:hover': {
              transform: 'scale(1.01)',
              boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)',
            },
          }}>
            <CardMedia
              component="img"
              height="200"
              image={vendor.stall_logo_url}
              alt={vendor.stall_name}
              sx={{ objectFit: 'cover', width: "100%", height: "30vh", }}
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h6" sx={{ paddingLeft: "6px" }} gutterBottom>
                {vendor.stall_name}
              </Typography>
              <Button onClick={(e) => openPopover(e, vendor)} variant="text" color="primary">
                View Categories
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}

      <Popover
        open={Boolean(anchorEl && selectedVendor)}
        anchorEl={anchorEl}
        onClose={closePopover}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Box sx={{ padding: 2, minWidth: 200 }}>
          <Typography variant="h6" gutterBottom>
            {selectedVendor ? selectedVendor.stall_name : ''}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Type of Categories:
          </Typography>
          <List>
            {selectedVendor ? (
              selectedVendor.type_of_categories.map((category, index) => (
                <ListItem key={index}>
                  <ListItemText primary={category} />
                </ListItem>
              ))
            ) : (
              <ListItem>
                <ListItemText primary="No categories" />
              </ListItem>
            )}
          </List>
        </Box>
      </Popover>
    </Grid>
  );
};

export default CustomerStall;
