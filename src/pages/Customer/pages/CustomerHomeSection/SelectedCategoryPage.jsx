import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  CircularProgress,
  Container,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import defaultImage from "../../../../images/default.jpg";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
import DEFAULT_URL from "../../../../config";

const SelectedCategoryPage = () => {
  const { id } = useParams();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const Navigate = useNavigate();

  useEffect(() => {
    const fetchSelectedCategory = async () => {
      const token = localStorage.getItem("access-token");
      try {
        const response = await axios.get(
          `${DEFAULT_URL}/api/v1/customer/categories`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "ngrok-skip-browser-warning": true,
            },
          }
        );
        const foundCategory = response.data.categories.find(
          (category) => category.id === parseInt(id)
        );
        if (foundCategory) {
          setSelectedCategory(foundCategory);
        } else {
          console.error("Category not found");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchSelectedCategory();
  }, [id]);

  const handleVendorClick = (vendorId, id) => {
    console.log("Vendor ID: ", vendorId);
    console.log("category ID:", id);
    Navigate(`/customer/${vendorId}/foodItem/${id}`);
  };

 
  if (!selectedCategory) {
    return <div>Category not found!</div>;
  }

  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          paddingBottom: "56px",
          minHeight: "100vh",
          bgcolor: "#f9f9f9",
        }}
      >
        <Container sx={{ py: 8 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
          >
            <Typography variant="h5">
              Vendors for {selectedCategory.name}
            </Typography>
            <Link to="/customer/home" style={{ textDecoration: "none" }}>
              <Button variant="outlined" startIcon={<ArrowBackIcon />}>
                Back
              </Button>
            </Link>
          </Box>
          <Grid container spacing={3}>
            {selectedCategory.vendors.map((vendor) => (
              <Grid item xs={12} sm={6} md={4} key={vendor.id}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <img
                    src={defaultImage}
                    alt={vendor.stall_name}
                    style={{
                      width: "100%",
                      objectFit: "cover",
                      maxHeight: "200px",
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" gutterBottom>
                      {vendor.stall_name}
                    </Typography>
                    <Button
                      variant="contained"
                      onClick={() => handleVendorClick(vendor.id, id)}
                      color="primary"
                      fullWidth
                    >
                      View Food Items
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default SelectedCategoryPage;
