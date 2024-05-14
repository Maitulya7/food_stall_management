import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
const AdminTopbar = ({ pageTitle }) => {
  return (
    <AppBar position="static" sx={{ bgcolor: '#fff' , boxShadow:"none" }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: '#222831' }}>
          {pageTitle}
        </Typography>

      </Toolbar>
    </AppBar>
  );
};

export default AdminTopbar;
