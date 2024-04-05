import React from 'react';
import { Box } from '@mui/material';

const DashboardBox = ({ label, value, color }) => {
  return (
    <Box
      sx={{
        backgroundColor: color,
        color: 'white',
        padding: '20px',
        borderRadius: '5px',
      }}
    >
      {label}
      <br />
      <strong>{value}</strong>
    </Box>
  );
};

export default DashboardBox;
