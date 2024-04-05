import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Badge } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Brightness4Icon from '@mui/icons-material/Brightness4';

const AdminTopbar = ({ pageTitle }) => {
  return (
    <AppBar position="static" sx={{ bgcolor: '#fff' , boxShadow:"none" }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: '#222831' }}>
          {pageTitle}
        </Typography>
        <IconButton color="inherit" sx={{ mr: 2, color: '#76ABAE' }}>
          <Brightness4Icon /> {/* Dark/Light Mode Toggle Button */}
        </IconButton>
        <IconButton color="inherit">
          <Badge badgeContent={4} color="error"> {/* Number of Notifications */}
            <NotificationsIcon sx={{ color: '#76ABAE' }} /> {/* Notification Icon */}
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default AdminTopbar;
