import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Badge, Avatar, Box } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const VendorTopbar = ({ pageTitle }) => {
  const logo = localStorage.getItem("stall_logo")
  const firstName = localStorage.getItem("firstName")
  const lastName = localStorage.getItem("lastName")
  
  return (
    <AppBar position="static" sx={{ bgcolor: '#fff', boxShadow: 'none',padding:"5px"}}>
      <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: '#222831' }}>
          {pageTitle}
        </Typography>
        <div>
          <Box sx={{display:"flex" , alignItems:"center" , gap:"3px" , paddingX:"20px"}}>
          <Typography sx={{color:"black", fontWeight:"bold"}}>{firstName} {lastName}</Typography>
          <IconButton color="primary" component={Link} to="/vendor/profile">
            <Avatar alt="Profile" src={logo} sx={{ marginLeft: 2, marginRight: 1 }} />
          </IconButton>
         
          {/* <IconButton color="inherit">
            <Badge badgeContent={4} color="error">
              <NotificationsIcon sx={{ color: '#76ABAE' }} />
            </Badge>
          </IconButton> */}
            </Box>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default VendorTopbar;
