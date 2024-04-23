import React, { useState } from 'react';
import { Grid, Card, CardContent, Typography, Button, Box, Chip } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FoodItemPage from './FoodItemPage'; // Import the FoodItemPage component

const MAX_DISPLAY_CATEGORIES = 5;

const SelectedCategoryPage = ({ selectedCategory, handleGoBack }) => {
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);

  const toggleShowAllCategories = () => {
    setShowAllCategories(!showAllCategories);
  };

  const handleVendorClick = (vendorId) => {
    setSelectedVendor(vendorId);
  };

  const handleBackToVendors = () => {
    setSelectedVendor(null);
  };

  if (selectedVendor) {
    return (
      <FoodItemPage vendorId={selectedVendor} handleGoBack={handleBackToVendors} />
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
        <Typography variant="h5">
          Vendors for {selectedCategory.name}
        </Typography>
        <Button variant="outlined" onClick={handleGoBack} startIcon={<ArrowBackIcon />}>
          Back
        </Button>
      </Box>
      <Grid container spacing={3}>
        {selectedCategory.vendors.map((vendor) => (
          <Grid item xs={12} sm={6} md={4} key={vendor.id}>
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
                  src={vendor.stall_logo_url}
                  alt={vendor.stall_name}
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
                  {vendor.stall_name}
                </Typography>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
                  <Typography variant="subtitle1">Type of Categories:</Typography>
                  <div style={{ display: 'flex', flexWrap: 'wrap', marginLeft: 5 }}>
                    {vendor.type_of_categories.slice(0, showAllCategories ? undefined : MAX_DISPLAY_CATEGORIES).map((category) => (
                      <Chip
                        key={category}
                        label={category}
                        size="small"
                        color="primary"
                        style={{ marginRight: 5, marginBottom: 5 }}
                      />
                    ))}
                    {vendor.type_of_categories.length > MAX_DISPLAY_CATEGORIES && (
                      <Button
                        size="small"
                        onClick={toggleShowAllCategories}
                        style={{ textTransform: 'none', marginLeft: 5 }}
                      >
                        {showAllCategories ? 'Show Less' : `+ ${vendor.type_of_categories.length - MAX_DISPLAY_CATEGORIES} More`}
                      </Button>
                    )}
                  </div>
                </div>
                <Button
                  variant="contained"
                  onClick={() => handleVendorClick(vendor.id)}
                  color="primary"
                >
                  View Food Items
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default SelectedCategoryPage;
