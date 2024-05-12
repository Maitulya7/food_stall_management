import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Card, CardContent, Typography, CircularProgress, Box } from '@mui/material';
import DEFAULT_URL from '../../../../config';
import defaultImage from '../../../../images/default.jpg';
import SelectedCategoryPage from './SelectedCategoryPage';
import { useNavigate } from 'react-router-dom';
import Footer from '../Components/Footer';

const CustomerHome = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const Navigate = useNavigate()

  useEffect(() => {
    const fetchCategories = async () => {
      const token = localStorage.getItem('access-token');
      try {
        const response = await axios.get(`${DEFAULT_URL}/api/v1/customer/categories`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": true,
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
    Navigate(`/customer/${category.id}`)

  };

  const handleGoBack = () => {
    setSelectedCategory(null);
  };

  return (
    <>
    <div>
      {selectedCategory ? (
        <SelectedCategoryPage selectedCategory={selectedCategory} handleGoBack={handleGoBack} />
      ) : (
        <Grid sx={{paddingX:{xs:4, sm:12, md:32 , lg:44} , paddingY:{xs:4 , sm:6, md:8 , lg:10} ,marginBottom:6}} container spacing={3}>
          {loading ? (
            <Box sx={{height:"100vh" , margin:"auto" , display:'flex' , justifyContent:"center"}}>
              <CircularProgress />
            </Box>
          ) : (
            categories.map(({ id, name, image, vendors }) => (
              <Grid 
                item 
                xs={12} 
                sm={6} 
                md={4} 
                key={id}
                
              >
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
                  <div style={{ position: 'relative', maxHeight: 200, overflow: 'auto' }}>
                    <img
                      src={defaultImage}
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
                  <CardContent sx={{ display: 'flex' , alignItems:"center" , justifyContent:"space-between"}}>
                    <Typography variant="h6" >
                      {name}
                    </Typography>
                    <Box>
                      <Typography
                        color="primary"
                        sx={{ fontWeight: 'bold', cursor: 'pointer' }}
                        onClick={() => handleViewMore({ id, name, vendors })}
                      >
                        View
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
        <Footer/>
    </>
  );
};

export default CustomerHome;
