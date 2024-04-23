import React, { useState, useEffect } from 'react';
import { Grid, Button, Box, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';
import DEFAULT_URL from '../../../../../../config';
import DEFAULT_IMAGE from '../../../../../../images/pizza.jpg';
import FoodItemCard from './FoodItemCard'; // Import the new component

const MAX_DISPLAY_FOOD_ITEMS = 10;

const FoodItemPage = ({ vendorId, handleGoBack, categoryId }) => {
  const [foodItems, setFoodItems] = useState([]);
  const [showAllItems, setShowAllItems] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('access-token');
    const fetchFoodItems = async () => {
      try {
        const response = await axios.get(`${DEFAULT_URL}/api/v1/customer/food_items?vendor_id=${vendorId}&category_id=${categoryId}`, {
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
            <FoodItemCard
              foodItem={foodItem}
              handleAddToCart={handleAddToCart}
            />
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
