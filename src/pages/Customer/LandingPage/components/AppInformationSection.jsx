import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import { Download, EmojiEmotions, People, Star } from '@mui/icons-material';

const AppInformationSection = () => {
  // Define a color palette for the icons based on their names
  const iconColors = {
    Download: '#4caf50', // Green for app downloads
    EmojiEmotions: '#ff9800', // Orange for happy clients
    People: '#3f51b5', // Blue for active users
    Star: '#f44336', // Red for total rating
  };

  // Sample data for each box
  const appData = [
    { icon: <Download fontSize="large" color="inherit" />, number: '5.0B+', label: 'App Downloads', name: 'Download' },
    { icon: <EmojiEmotions fontSize="large" color="inherit" />, number: '4.0B+', label: 'Happy Clients', name: 'EmojiEmotions' },
    { icon: <People fontSize="large" color="inherit" />, number: '4.5B+', label: 'Active Users', name: 'People' },
    { icon: <Star fontSize="large" color="inherit" />, number: '4.8', label: 'Total Rating', name: 'Star' },
  ];

  return (
    <Grid container spacing={3} sx={{ padding: '2rem'  , display:"flex" , justifyContent:"center" , alignItems:"center" }}>
      {appData.map((data, index) => (
        <Grid item xs={12} sm={6} md={3} lg={3} key={index}>
          <Box
            sx={{
              padding: '1.5rem',
              borderRadius: '12px',
              background: 'linear-gradient(180deg, #056C4F, #047857)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              color: 'white', // Text color for better contrast
            }}
          >
            <Box sx={{ color: iconColors[data.name] }}>
              {data.icon}
            </Box>
            <Typography variant="h4" sx={{ marginTop: '0.5rem' }}>
              {data.number}
            </Typography>
            <Typography variant="body1" sx={{ marginTop: '0.5rem' }}>
              {data.label}
            </Typography>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default AppInformationSection;
