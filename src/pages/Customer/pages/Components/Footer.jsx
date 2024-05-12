import React from 'react';
import { BottomNavigation, BottomNavigationAction, Grid } from '@mui/material';
import { Home, Fastfood, ShoppingCart, AccountCircle } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname.startsWith(path);
  };

  return (
    <BottomNavigation
      showLabels
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        boxShadow: '0px -1px 4px rgba(0, 0, 0, 0.1)',
        bgcolor: '#fff',
        zIndex: 1000,
        padding: '5px 0', // Add padding for better spacing
        height: '60px', // Add height for better spacing
      }}
    >
      <Grid container justifyContent="space-around"> {/* Use Grid for better layout */}
        <Link to="/customer/home">
          <BottomNavigationAction label="Home" icon={<Home />} selected={isActive('/customer/home')} />
        </Link>
        <Link to="/customer/stall">
          <BottomNavigationAction label="Stalls" icon={<Fastfood />} selected={isActive('/customer/stall')} />
        </Link>
        <Link to="/customer/cart">
          <BottomNavigationAction label="Cart" icon={<ShoppingCart />} selected={isActive('/customer/cart')} />
        </Link>
        <Link to="/customer/profile">
          <BottomNavigationAction label="Profile" icon={<AccountCircle />} selected={isActive('/customer/profile')} />
        </Link>
      </Grid>
    </BottomNavigation>
  );
};

export default Footer;
