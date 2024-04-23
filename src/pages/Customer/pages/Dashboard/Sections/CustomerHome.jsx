import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Card, CardContent, Typography, IconButton, CircularProgress, Box, Button } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon  } from '@mui/icons-material';
import DEFAULT_URL from '../../../../../config';
import defaultImage from '../../../../../images/default.jpg';
import SelectedCategoryPage from './SelectedCategoryPage';

const CustomerHome = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      const token = localStorage.getItem('access-token');
      try {
        const response = await axios.get(`${DEFAULT_URL}/api/v1/customer/categories`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response);
        setCategories(response.data.categories);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleViewMore = (category) => {
    setSelectedCategory(category);
  };

  const handleGoBack = () => {
    setSelectedCategory(null);
  };

  return (
    <div style={{ padding: 20 }}>
      {selectedCategory ? (
        <SelectedCategoryPage selectedCategory={selectedCategory} handleGoBack={handleGoBack} />
      ) : (
        <Grid container spacing={3}>
          {loading ? (
            <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
              <CircularProgress />
            </Grid>
          ) : (
            categories.map(({ id, name, image, vendors }) => (
              <Grid item xs={12} sm={6} md={4} key={id}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
                    borderRadius: '8px',
                    transition: 'transform 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.02)',
                      boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.2)',
                    },
                  }}
                >
                  <div style={{ position: 'relative', maxHeight: 200, overflow: 'hidden' }}>
                    <img
                      src={image || defaultImage}
                      alt={name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.3s ease',
                        '&:hover': {
                          transform: 'scale(1.1)',
                        },
                      }}
                    />
                  </div>
                  <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h6" component="div" gutterBottom>
                      {name}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Typography
                        variant="body2"
                        color="primary"
                        sx={{ fontWeight: 'bold', cursor: 'pointer' }}
                        onClick={() => handleViewMore({ id, name, vendors })}
                      >
                        View More
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      )}
    </div>
  );
};

export default CustomerHome;
