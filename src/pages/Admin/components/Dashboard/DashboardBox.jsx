import React from 'react';
import { Box } from '@mui/material';

const DashboardBox = ({ label, value, color, selected }) => {
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
      {label}
      <br />
      <strong>{value}</strong>
    </Box>
  );
};

export default DashboardBox;
