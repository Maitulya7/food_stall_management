import React from 'react';
import { Grid, Typography, Button, AppBar, Toolbar, Box } from '@mui/material';
import HeroSection from './components/HeroSection';


const CustomerLandingPage = () => {
  return (
    <>
      <AppBar sx={{paddingX:20, paddingY:2 , backgroundColor:"transparent" , color:"black" , boxShadow:"none"}} position="static">
        <Toolbar >
          <Typography  variant="h6" component="div" sx={{ flexGrow: 1 , color:"#047857" , fontWeight:"bold" }}>
            Food Stall
          </Typography>
          <Box sx={{display:"flex" , gap:"15px" , alignItems:"center"}}>
            <Button sx={{ backgroundColor: "#047857", borderRadius: "15px", paddingX: "24px", paddingY: "12px" , color:"white", '&:hover': { backgroundColor: '#F0745E' } }}>Login</Button>
            <Button  sx={{ backgroundColor: "#047857", borderRadius: "15px", paddingX: "24px", paddingY: "12px" , color:"white", '&:hover': { backgroundColor: '#F0745E' } }}>Sign Up</Button>
          </Box>
        </Toolbar>
      </AppBar>
     <HeroSection/>
    </>
  );
}

export default CustomerLandingPage;
