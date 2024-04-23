import React from 'react';
import { Box ,Container, Typography } from '@mui/material';
import Footer from '../Components/Footer';
import CustomerHome from './Sections/CustomerHomeSection/CustomerHome';
import CustomerStall from './Sections/CustomerStallSection/CustomerStall';
import CustomerCart from './Sections/CustomerCart';
import CustomerProfile from './Sections/CustomerProfile';

const CustomerDashboard = () => {
  const [tabIndex, setTabIndex] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <Box sx={{ flexGrow: 1, paddingBottom: '56px', minHeight: '100vh', bgcolor: '#f9f9f9' }}>
      <Container sx={{ py: 4 }}>
        {tabIndex === 0 && (
          <Typography variant="h6" sx={{ mt: 2 }}>   <span style={{marginLeft:"20px"}}>Explore Categories</span> {<CustomerHome/>}</Typography>
        )}
        {tabIndex === 1 && (
          <Typography variant="h6" sx={{ mt: 2 }}>  <span>Explore All Stalls</span>{<CustomerStall/>}</Typography>
        )}
        {tabIndex === 2 && (
          <Typography variant="h4" sx={{ mt: 2 }}>{<CustomerCart/>}</Typography>
        )}
        {tabIndex === 3 && (
          <Typography variant="h4" sx={{ mt: 2 }}>{<CustomerProfile/>}</Typography>
        )}
      </Container>

      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          boxShadow: '0px -1px 4px rgba(0, 0, 0, 0.1)',
          bgcolor: '#fff',
          zIndex: 1000,
        }}
      >
       |<Footer tabIndex={tabIndex} handleTabChange={handleTabChange}/>
      </Box>
    </Box>
  );
};

export default CustomerDashboard;
