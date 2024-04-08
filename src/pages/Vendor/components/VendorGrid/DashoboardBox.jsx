import React from 'react';
import { Box, Typography } from '@mui/material';

const DashboardBox = ({ label, value, color, selected, icon }) => {
  return (
    <Box
      sx={{
        backgroundColor: selected ? color : '#dcedc8',
        color: selected ? '#fff' : '#000',
        padding: '25px',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'background-color 0.2s, color 0.2s', // Smoother transitions
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', // Subtle box shadow
        '&:hover': {
          backgroundColor: selected ? color : '#c5e1a5',
          color: selected ? '#fff' : '#000',
        },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">{label}</Typography>
        {icon}
      </Box>
      <strong>{value}</strong>
    </Box>
  );
};

export default DashboardBox;
