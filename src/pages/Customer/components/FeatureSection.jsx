import React from 'react';
import { Typography, Container, Grid, Paper } from '@mui/material';
import { AccountCircle, ShoppingCart, Favorite } from '@mui/icons-material';

const FeatureSection = () => {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        py: 4,
        px: 8,
        height: { xs: 'auto', md: '100vh' }, // Height responsive for xs and md+
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: '20px', sm: '30px', md: '40px', lg: '50px' },
          fontWeight: 'bold',
          color: '#047857',
          mb: 4,
        }}
      >
        Why are we unique?
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <Paper
            elevation={6}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              p: 3,
              bgcolor: '#f3f4f6',
              height: { xs: 'auto', sm: '300px', md: '350px' }, // Height responsive for xs, sm, md
              textAlign: 'center',
              borderRadius: '12px',
              boxShadow: '0px 10px 15px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.3s ease',
              width: '100%',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
          >
            <AccountCircle sx={{ fontSize: { xs: '40px', sm: '50px', md: '60px' }, color: '#10b981' }} />
            <Typography variant="h4" sx={{ mt: 2, mb: 2, fontSize: { xs: '18px', sm: '20px', md: '24px' } }}>
              We’ve upped the game.
            </Typography>
            <Typography variant="body1" sx={{ color: '#374151', fontSize: { xs: '14px', sm: '16px', md: '18px' } }}>
              We carry a variety of products through our unique vendors that you can’t typically get delivered.
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={4}>
          <Paper
            elevation={6}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              p: 3,
              bgcolor: '#f3f4f6',
              height: { xs: 'auto', sm: '300px', md: '350px' },
              textAlign: 'center',
              borderRadius: '12px',
              boxShadow: '0px 10px 15px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.3s ease',
              width: '100%',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
          >
            <ShoppingCart sx={{ fontSize: { xs: '40px', sm: '50px', md: '60px' }, color: '#10b981' }} />
            <Typography
              variant="h4"
              sx={{
                mt: 2,
                mb: 2,
                fontSize: { xs: '18px', sm: '20px', md: '24px' },
              }}
            >
              Order from our virtual mall of Local Stores
            </Typography>
            <Typography variant="body1" sx={{ color: '#374151', fontSize: { xs: '14px', sm: '16px', md: '18px' } }}>
              Order from a large variety of local stores you like and trust for years.
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={4}>
          <Paper
            elevation={6}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              p: 3,
              bgcolor: '#f3f4f6',
              height: { xs: 'auto', sm: '300px', md: '350px' },
              textAlign: 'center',
              borderRadius: '12px',
              boxShadow: '0px 10px 15px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.3s ease',
              width: '100%',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
          >
            <Favorite sx={{ fontSize: { xs: '40px', sm: '50px', md: '60px' }, color: '#10b981' }} />
            <Typography
              variant="h4"
              sx={{
                mt: 2,
                mb: 2,
                fontSize: { xs: '18px', sm: '20px', md: '24px' },
              }}
            >
              Easy access to local services
            </Typography>
            <Typography variant="body1" sx={{ color: '#374151', fontSize: { xs: '14px', sm: '16px', md: '18px' } }}>
              We can pick up and drop off to make your life easier.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default FeatureSection;
