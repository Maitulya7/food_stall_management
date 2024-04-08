import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Badge } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';

const VendorTopbar = ({ pageTitle }) => {
  return (
    <AppBar position="static" sx={{ bgcolor: '#fff' , boxShadow:"none" }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: '#222831' }}>
          {pageTitle}
        </Typography>
        <IconButton color="inherit">
          <Badge badgeContent={4} color="error"> {/* Number of Notifications */}
            <NotificationsIcon sx={{ color: '#76ABAE' }} /> {/* Notification Icon */}
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default VendorTopbar;
