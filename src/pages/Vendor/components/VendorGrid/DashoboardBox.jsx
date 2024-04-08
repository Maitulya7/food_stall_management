import React from 'react';
import { Box ,Typography } from '@mui/material';

const DashboardBox = ({ label, value, color, selected, icon }) => {
  return (
    <Box
      sx={{
        backgroundColor: selected ? color : '#dcedc8', // Change background color if selected
        color: selected ? '#fff' : '#000', // Change text color based on selection
        padding: '20px',
        borderRadius: '5px',
        cursor: 'pointer', // Add cursor pointer
      }}
    >
      {/* Render the icon here */}
      <br />
      <Box sx={{display:'flex' , justifyContent:'space-between'}}>
      <Typography variant='h6'>{label}</Typography>
        {icon}
      </Box>
      <br />
      <strong>{value}</strong>
    </Box>
  );
};

export default DashboardBox;
