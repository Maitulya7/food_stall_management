import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FeatureSection from './components/FeatureSection';
import DownloadSection from './components/DownloadSection';
import { Box, Grid, Paper, Typography } from '@mui/material';

import app_feature_bg from "../../images/app_feature.png"
import { AccountCircle, CheckCircle } from '@mui/icons-material';


const CustomerLandingPage = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <FeatureSection />
      <DownloadSection />
      <Box
      sx={{
        height: '100vh',
        px: 22,
        py: 4,
        background: 'linear-gradient(180deg, #056C4F, #047857)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Grid container sx={{ height: '100vh' }}>
        <Grid item xs={12} md={6} sx={{ mt: 'auto', mb: 'auto' }}>
          {['Features 1', 'Features 2', 'Features 3', 'Features 4'].map((feature, index) => (
            <Paper
              key={index}
              elevation={3}
              sx={{
                textAlign: 'left',
                color: 'white',
                p: 3,
                mb: 2,
                width: '80%',
                borderRadius: 2,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(4px)',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <AccountCircle sx={{ fontSize: 60, color: '#10b981', mr: 2 }} />
              <Typography sx={{ fontWeight: 'bold' }} variant="h5" color="white">
                {feature}
              </Typography>
            </Paper>
          ))}
        </Grid>

        <Grid item xs={12} md={6}>
          <Box
            sx={{
              width: '100%',
              height: '100%',
          
            }}
          >
            <img
              src={app_feature_bg}
              alt="Features Background"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
    </>
  );
};

export default CustomerLandingPage;
