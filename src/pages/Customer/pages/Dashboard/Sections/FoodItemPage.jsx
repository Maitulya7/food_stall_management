import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, Button, Box, Chip, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'; // Material-UI icon for dots
import axios from 'axios';
import DEFAULT_URL from '../../../../../config';

const MAX_DISPLAY_FOOD_ITEMS = 10;
const DEFAULT_IMAGE = 'https://via.placeholder.com/150'; // Default image URL

const FoodItemPage = ({ vendorId, handleGoBack }) => {
  const [foodItems, setFoodItems] = useState([]);
  const [showAllItems, setShowAllItems] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('access-token');
    const fetchFoodItems = async () => {
      try {
        const response = await axios.get(`${DEFAULT_URL}/api/v1/customer/food_items?vendor_id=${vendorId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFoodItems(response.data.food_items);
      } catch (error) {
        console.error('Error fetching food items:', error);
      }
    };

    fetchFoodItems();
  }, [vendorId]);

  const toggleShowAllItems = () => {
    setShowAllItems(!showAllItems);
  };

  const handleAddToCart = (foodItemId) => {
    // Implement adding to cart functionality here
    console.log(`Add item to cart: ${foodItemId}`);
  };

  const getDotColor = (type) => {
    return type === 'Veg' ? 'green' : 'red';
  };

  return (
    <Box p={2}>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography variant="h5">
          Food Items
        </Typography>
        <Button variant="outlined" onClick={handleGoBack} startIcon={<ArrowBackIcon />}>
          Back
        </Button>
      </Box>
      <Grid container spacing={3}>
        {foodItems.slice(0, showAllItems ? undefined : MAX_DISPLAY_FOOD_ITEMS).map((foodItem) => (
          <Grid item xs={12} sm={6} md={4} key={foodItem.id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '12px',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.03)',
                  boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.2)',
                },
              }}
            >
              <Box position="relative" maxHeight={200} overflow="hidden" borderRadius="12px 12px 0 0">
                <img
                  src={foodItem.image_url || DEFAULT_IMAGE}
                  alt={foodItem.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease',
                    borderRadius: '12px 12px 0 0',
                    '&:hover': {
                      transform: 'scale(1.1)',
                    },
                  }}
                />
             
                <Box
                  position="absolute"
                  bottom={5}
                  left={5}
                  zIndex={1}
                >
                  <FiberManualRecordIcon
                    style={{
                      color: getDotColor(foodItem.item_type),
                      fontSize: 20,
                    }}
                  />
                </Box>
              </Box>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="div" gutterBottom>
                  {foodItem.name}
                </Typography>
                <Box mb={1}>
                  {foodItem.sub_type.map((subType, index) => (
                    <Chip key={index} label={subType} variant="outlined" size="small" />
                  ))}
                </Box>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Taste: {foodItem.taste.join(', ')}
                </Typography>
                <Box mt="auto" display="flex" alignItems="center" justifyContent="space-between">
                  <Typography variant="body2" color="text.secondary">
                    ${foodItem.price}
                  </Typography>
                  <IconButton
                    color="primary"
                    aria-label="add to cart"
                    onClick={() => handleAddToCart(foodItem.id)}
                  >
                    <AddShoppingCartIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {foodItems.length > MAX_DISPLAY_FOOD_ITEMS && (
        <Button
          onClick={toggleShowAllItems}
          style={{ textTransform: 'none', marginTop: 10 }}
        >
          {showAllItems ? 'Show Less' : `+ ${foodItems.length - MAX_DISPLAY_FOOD_ITEMS} More`}
        </Button>
      )}
    </Box>
  );
};

export default FoodItemPage;
