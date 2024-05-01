import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, Chip, IconButton, Modal, Button } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import DEFAULT_IMAGE from '../../../../images/pizza.jpg';

const FoodItemCard = ({ foodItem, handleAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  const getDotColor = (type) => {
    return type === 'Veg' ? 'green' : 'red';
  };

  const handleAdd = () => {
    setQuantity(quantity + 1);
  };

  const handleRemove = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCartClick = () => {
    handleAddToCart(foodItem.id, quantity, foodItem.price);
  };



  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '12px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
      
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
      </Box>
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6" component="div" gutterBottom>
            {foodItem.name}
          </Typography>
          <Box sx={{ paddingBottom: '12px' }}>
            <FiberManualRecordIcon
              style={{
                color: getDotColor(foodItem.item_type),
                fontSize: 20,
              }}
            />
          </Box>
        </Box>
        <Box mb={1}>
          {foodItem.sub_type.map((subType, index) => (
            <Chip key={index} label={subType} variant="outlined" size="small" />
          ))}
        </Box>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Taste: {foodItem.taste.join(', ')}
        </Typography>
        <Box mt="auto" display="flex" alignItems="center" justifyContent="space-between">
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton aria-label="remove" onClick={handleRemove}>
              <RemoveCircleOutlineIcon />
            </IconButton>
            <Typography variant="body1" sx={{ fontWeight: 'bold', mx: 1 }}>
              {quantity}
            </Typography>
            <IconButton aria-label="add" onClick={handleAdd}>
              <AddCircleOutlineIcon />
            </IconButton>
          </Box>
          <Typography variant="body1" sx={{ fontWeight: 'bold' }} color="black">
            ${foodItem.price * quantity}
          </Typography>
          <IconButton color="primary" aria-label="add to cart" onClick={handleAddToCartClick}>
            <ShoppingCartIcon />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

export default FoodItemCard;
