import React, { useState } from 'react';
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarFooter, SidebarContent } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { MdMenu, MdClose } from 'react-icons/md';
import { Dashboard, Category, Markunread, CheckCircle, Schedule, Cancel } from '@mui/icons-material';
import { IconButton } from '@mui/material'; // Import IconButton
import { Logout } from '@mui/icons-material'; // Import Logout icon
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for navigation

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
  background-color: #222831;
`;

const CloseButton = styled.div`
  position: absolute;
  top: 25px;
  left: ${({ collapsed }) => (collapsed ? '20px' : '240px')};
  z-index: 999;
  cursor: pointer;
  transition: left 0.3s;
  &:hover {
    color: #76ABAE;
  }
`;

const Header = styled.div`
  padding: 20px;
  color: #76ABAE;
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

const AdminSidebar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleToggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleLogout = () => {
    // Remove access token from local storage
    localStorage.removeItem('access-token');
    // Navigate to the login page
    navigate('/admin/login');
  };

  return (
    <FullHeightSidebar collapsed={collapsed}>
      <SidebarHeader>
        <Header collapsed={collapsed}>Admin Panel</Header>
        <SidebarToggle onClick={handleToggleCollapsed}>
          {collapsed ? <MdMenu style={{ fontSize: '24px', color: '#EEEEEE' }} /> : null}
        </SidebarToggle>
      </SidebarHeader>
      {!collapsed && (
        <SidebarContent>
          <Menu iconShape="square">
            <CustomMenuItem style={{margin:"10px"}} icon={<Dashboard />}>Dashboard</CustomMenuItem>
            <CustomMenuItem style={{margin:"10px"}} icon={<Category />}>Category</CustomMenuItem>
            <SubMenu  style={{margin:"10px"}} title="Request" icon={<Markunread />}>
              <CustomMenuItem  icon={<CheckCircle />}>Accepted</CustomMenuItem>
              <CustomMenuItem  icon={<Schedule />}>Pending</CustomMenuItem>
              <CustomMenuItem   icon={<Cancel />}>Rejected</CustomMenuItem>
            </SubMenu>
          </Menu>
        </SidebarContent>
      )}
      <SidebarFooter style={{ textAlign: 'center', padding: '20px' }}>
        {!collapsed && (
          <IconButton onClick={handleLogout} color="inherit">
            <Logout /> {/* Logout icon */}
          </IconButton>
        )}
      </SidebarFooter>
      {!collapsed && (
        <CloseButton collapsed={collapsed} onClick={handleToggleCollapsed}>
          <MdClose style={{ fontSize: '24px', color: '#EEEEEE', cursor: "pointer" }} />
        </CloseButton>
      )}
    </FullHeightSidebar>
  );
};

export default AdminSidebar;
