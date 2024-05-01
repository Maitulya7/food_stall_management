import React, { useState, useEffect } from 'react';
import { Grid, Button, Box, Typography, CircularProgress } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import FoodItemCard from './FoodItemCard';
import DEFAULT_URL from '../../../../config';

const MAX_DISPLAY_FOOD_ITEMS = 10;

const FoodItemPage = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [showAllItems, setShowAllItems] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const { vendorId, categoryId } = useParams();

  useEffect(() => {
    const fetchFoodItems = async () => {
      const token = localStorage.getItem('access-token');
      try {
        const response = await axios.get(`${DEFAULT_URL}/api/v1/customer/food_items?vendor_id=${vendorId}&category_id=${categoryId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFoodItems(response.data.food_items);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching food items:', error);
        setLoading(false);
      }
    };

    fetchFoodItems();
  }, [vendorId, categoryId]);

  const handleGoBack = () => {
    navigate(`/customer/${categoryId}`);
  };

  const toggleShowAllItems = () => {
    setShowAllItems(!showAllItems);
  };

  const handleAddToCart = (foodItemId, quantity, price) => {
    const token = localStorage.getItem("access-token");
    axios.post(`${DEFAULT_URL}/api/v1/customer/carts`, {}, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    }).then((res) => {
      console.log(res);
      axios.post(`${DEFAULT_URL}/api/v1/customer/carts/cart_items`, {
        "cart_item": {
          "food_item_id": foodItemId,
          "quantity": quantity,
          "price": price
        }
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      }).then((res) => {
        axios.post(`${DEFAULT_URL}/api/v1/customer/orders`, {
          "order": {
            "vendor_id": Number(vendorId),
            "amount_to_be_paid": price,
            "total_items": 1,
          }
        }, {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        }).then(() => {
          navigate('/customer/cart');
        });
      });
    });
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box
      sx={{
        py: [8, 8], 
        px: [4, 48], 
      }}
    >
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography variant="h5">
          Food Items
        </Typography>
        <Button onClick={handleGoBack} variant="outlined" startIcon={<ArrowBackIcon />}>
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
        <Box mt={2}>
          <Button
            onClick={toggleShowAllItems}
            variant="outlined"
          >
            {showAllItems ? 'Show Less' : `+ ${foodItems.length - MAX_DISPLAY_FOOD_ITEMS} More`}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default FoodItemPage;
