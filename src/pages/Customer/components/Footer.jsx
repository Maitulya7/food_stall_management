import React from 'react';
import { Box, Container, Typography, IconButton } from '@mui/material';
import {
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  LinkedIn as LinkedInIcon,
  Instagram as InstagramIcon,
  YouTube as YouTubeIcon,
} from '@mui/icons-material';

const Footer = () => {
  return (
    <Box sx={{ py: 4, backgroundColor: '#f5f5f5' }}>
      <Container>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <Typography variant="h6">Follow us on social media</Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <IconButton aria-label="Facebook" sx={{ color: '#3b5998' }}>
              <FacebookIcon />
            </IconButton>
            <IconButton aria-label="Twitter" sx={{ color: '#1da1f2' }}>
              <TwitterIcon />
            </IconButton>
            <IconButton aria-label="LinkedIn" sx={{ color: '#0077b5' }}>
              <LinkedInIcon />
            </IconButton>
            <IconButton aria-label="Instagram" sx={{ color: '#c13584' }}>
              <InstagramIcon />
            </IconButton>
            <IconButton aria-label="YouTube" sx={{ color: '#ff0000' }}>
              <YouTubeIcon />
            </IconButton>
          </Box>
          <Typography variant="body2" color="textSecondary">
            © {new Date().getFullYear()} SoftCoding Solution. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
