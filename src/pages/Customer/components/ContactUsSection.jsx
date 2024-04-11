import React from 'react';
import { Container, Box, Typography, TextField, Button } from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';

const ContactUsSection = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
    console.log('Form submitted');
  };

  return (
    <Container>
      <Box sx={{ py: 6, textAlign: 'center' }}>
        <Typography variant="h3" sx={{color:"#047857" , fontWeight:"bold"}} gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="subtitle1" sx={{ mb: 4 }}>
          If you have any questions or feedback, feel free to get in touch with us.
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            required
            type="email"
            sx={{ mb: 2 }}
          />
          <TextField
            label="Message"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            required
            sx={{ mb: 2 }}
          />
          <Button
            type="submit"
            variant="contained"
            endIcon={<SendIcon />}
            sx={{ width: '100%' , backgroundColor:"#047857" ,color:"white" , fontWeight:"bold"  , '&:hover': { backgroundColor: '#047857' } }}
          >
            Send Message
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ContactUsSection;
