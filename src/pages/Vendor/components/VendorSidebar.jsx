import React, { useState } from 'react';
import { ProSidebar, Menu, MenuItem, SidebarHeader, SidebarFooter, SidebarContent } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { MdMenu, MdClose } from 'react-icons/md';
import { Dashboard, Category } from '@mui/icons-material';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import { IconButton } from '@mui/material';
import { Logout } from '@mui/icons-material';
import styled, { keyframes } from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const SidebarToggle = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 999;
  cursor: pointer;
`;

const FullHeightSidebar = styled(ProSidebar)`
  height: 100vh;
  overflow: hidden;
  transition: width 0.3s;
  background: linear-gradient(to right, #222831, #4b778d);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  animation: ${fadeIn} 0.5s ease;
  transform-style: preserve-3d;
`;

const CloseButton = styled.div`
  position: absolute;
  top: 25px;
  left: ${({ collapsed }) => (collapsed ? '20px' : '240px')};
  z-index: 999;
  cursor: pointer;
  transition: left 0.3s;
  &:hover {
    color: #76abae;
  }
`;

const Header = styled.div`
  padding: 20px;
  color: #76abae;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  display: ${({ collapsed }) => (collapsed ? 'none' : 'block')};
`;

const CustomMenuItem = styled(MenuItem)`
  &:hover {

    background: linear-gradient(to right, #4b778d, #a5ccd8);
    color: #ffffff;
    transform: translateX(5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: background 0.3s, transform 0.3s, box-shadow 0.3s;
  }
`;

const VendorSidebar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const navigate = useNavigate();

  const handleToggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleLogout = () => {
    localStorage.removeItem('access-token');
    localStorage.removeItem('categories')
    localStorage.removeItem('stall_name');
    localStorage.removeItem('stall_logo');
    localStorage.removeItem('user-type')
    navigate('/vendor/login');
  };

  return (
    <FullHeightSidebar collapsed={collapsed}>
      <SidebarHeader>
        <Header collapsed={collapsed}>Vendor Panel</Header>
        <SidebarToggle onClick={handleToggleCollapsed}>
          {collapsed ? <MdMenu style={{ fontSize: '24px', color: '#eeeeee' }} /> : null}
        </SidebarToggle>
      </SidebarHeader>
      {!collapsed && (
        <SidebarContent>
          <Menu iconShape="square">
            <CustomMenuItem style={{margin:"10px"}} icon={<Dashboard />}><Link to='/vendor/home'>Dashboard</Link></CustomMenuItem>
            <CustomMenuItem style={{margin:"10px"}} icon={<AccountCircleIcon />}><Link to="/vendor/profile">Profile</Link></CustomMenuItem>
          </Menu>
        </SidebarContent>
      )}
      <SidebarFooter style={{ textAlign: 'center', padding: '20px' }}>
        {!collapsed && (
          <IconButton onClick={handleLogout} color="inherit">
            <Logout />
          </IconButton>
        )}
      </SidebarFooter>
      {!collapsed && (
        <CloseButton collapsed={collapsed} onClick={handleToggleCollapsed}>
          <MdClose style={{ fontSize: '24px', color: '#eeeeee', cursor: 'pointer' }} />
        </CloseButton>
      )}
    </FullHeightSidebar>
  );
};

export default VendorSidebar;
