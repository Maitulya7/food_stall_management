import React, { useRef } from 'react';
import { Box, Paper, Typography, Avatar, Icon, IconButton } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const ClientReviewSection = () => {
  const reviews = [
    {
      name: 'John Doe',
      avatar: 'https://source.unsplash.com/random/64x64?person1',
      rating: 4,
      review: 'Amazing app, really helped me out! Highly recommend!',
    },
    {
      name: 'Jane Smith',
      avatar: 'https://source.unsplash.com/random/64x64?person2',
      rating: 5,
      review: 'The best app I have used. Fantastic features and easy to use.',
    },
    {
      name: 'Michael Adams',
      avatar: 'https://source.unsplash.com/random/64x64?person3',
      rating: 3,
      review: 'Good app, but can use some improvements.',
    },
    {
      name: 'Anna Johnson',
      avatar: 'https://source.unsplash.com/random/64x64?person4',
      rating: 5,
      review: 'Absolutely wonderful experience with this app!',
    },
    {
      name: 'Emily Williams',
      avatar: 'https://source.unsplash.com/random/64x64?person5',
      rating: 4,
      review: 'Great app! I love the user interface and features.',
    },
    // Add more reviews as necessary
  ];

  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
    <Box sx={{ py: 6, px: { xs: 2, sm: 4, md: 6, lg: 8 } }}>
      <Typography variant="h4" sx={{ textAlign: 'center', mb: 4 }}>
        Client Reviews
      </Typography>
      <Box
        ref={scrollContainerRef}
        sx={{
          display: 'flex',
          alignItems: 'center',
          overflowX: 'auto',
          scrollbarWidth: 'none', // Hide scrollbar on Firefox
          msOverflowStyle: 'none', // Hide scrollbar on IE and Edge
          '&::-webkit-scrollbar': {
            display: 'none', // Hide scrollbar on Chrome, Safari, and other Webkit browsers
          },
        }}
      >
        {reviews.map((review, index) => (
          <Box
            key={index}
            sx={{
              minWidth: '300px',
              mx: 2,
              mb:1
            }}
          >
            <Paper
              elevation={3}
              sx={{
                p: 2,
                borderRadius: 2,
                textAlign: 'center',
                height: '100%',
              }}
            >
              <Avatar
                src={review.avatar}
                sx={{
                  width: 64,
                  height: 64,
                  mx: 'auto',
                  mb: 2,
                }}
              />
              <Typography variant="h6" sx={{ mb: 1 }}>
                {review.name}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  mb: 2,
                }}
              >
                {Array.from({ length: review.rating }).map((_, idx) => (
                  <Icon key={idx} color="warning">
                    <StarIcon />
                  </Icon>
                ))}
              </Box>
              <Typography variant="body2">
                "{review.review}"
              </Typography>
            </Paper>
          </Box>
        ))}
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mt: 2,
        }}
      >
        <IconButton onClick={scrollLeft}>
          <ArrowBackIosNewIcon />
        </IconButton>
        <IconButton onClick={scrollRight}>
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ClientReviewSection;
