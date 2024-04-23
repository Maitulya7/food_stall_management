import React from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { Home, Fastfood, ShoppingCart, AccountCircle } from '@mui/icons-material';

const Footer = ({ tabIndex, handleTabChange }) => {
  return (
    <BottomNavigation
      value={tabIndex}
      onChange={handleTabChange}
      showLabels
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        boxShadow: '0px -1px 4px rgba(0, 0, 0, 0.1)',
        bgcolor: '#fff',
        zIndex: 1000,
      }}
    >
      <BottomNavigationAction label="Home" icon={<Home />} />
      <BottomNavigationAction label="Stalls" icon={<Fastfood />} />
      <BottomNavigationAction label="Cart" icon={<ShoppingCart />} />
      <BottomNavigationAction label="Profile" icon={<AccountCircle />} />
    </BottomNavigation>
  );
};

export default Footer;
