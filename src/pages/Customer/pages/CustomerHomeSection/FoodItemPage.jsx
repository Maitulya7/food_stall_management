import React, { useState, useEffect } from "react";
import { Grid, Button, Box, Typography, CircularProgress } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import FoodItemCard from "./FoodItemCard";
import DEFAULT_URL from "../../../../config";
import Footer from "../Components/Footer";

const MAX_DISPLAY_FOOD_ITEMS = 10;

const FoodItemPage = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [showAllItems, setShowAllItems] = useState(false);
  const navigate = useNavigate();

  const { vendorId, categoryId } = useParams();

  useEffect(() => {
    const fetchFoodItems = async () => {
      const token = localStorage.getItem("access-token");
      try {
        const response = await axios.get(
          `${DEFAULT_URL}/api/v1/customer/food_items?vendor_id=${vendorId}&category_id=${categoryId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "ngrok-skip-browser-warning": true,
            },
          }
        );
        setFoodItems(response.data.food_items);
      } catch (error) {
        console.error("Error fetching food items:", error);
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
    const accessToken = localStorage.getItem("access-token");
    const cartId = localStorage.getItem("cart-id");

    if (cartId == null) {
      createCartAndAddItem(foodItemId, quantity, price, accessToken);
    } else {
      axios
        .get(`${DEFAULT_URL}/api/v1/customer/cart`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "ngrok-skip-browser-warning": true,
          },
        })
        .then((res) => {
          const cartId = res.data.cart.id;
          if (foodItemId) {
            updateCartItem(foodItemId, quantity, price, accessToken, cartId);
          } else {
            addCartItem(foodItemId, quantity, price, accessToken, cartId);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const createCartAndAddItem = (foodItemId, quantity, price, accessToken) => {
    axios
      .post(
        `${DEFAULT_URL}/api/v1/customer/carts`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        const cartId = res.data.cart.id;
        localStorage.setItem("cart-id", cartId);
        addCartItem(foodItemId, quantity, price, accessToken, cartId);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addCartItem = (foodItemId, quantity, price, accessToken) => {
    axios
      .post(
        `${DEFAULT_URL}/api/v1/customer/carts/cart_items`,
        {
          cart_item: {
            food_item_id: foodItemId,
            quantity: quantity,
            price: price * quantity,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateCartItem = (foodItemId, quantity, price, accessToken, cartId) => {
    axios
      .get(`${DEFAULT_URL}/api/v1/customer/cart`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "ngrok-skip-browser-warning": true,
        },
      })
      .then((res) => {
        const cartItems = res.data.cart.cart_items;
        let existingCartItem = cartItems.find(
          (item) => item.food_item_id === foodItemId
        );

        if (existingCartItem) {
          axios
            .put(
              `${DEFAULT_URL}/api/v1/customer/carts/cart_items/${existingCartItem.id}`,
              {
                cart_item: {
                  food_item_id: foodItemId,
                  quantity: quantity,
                  price: price * quantity,
                },
              },
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              }
            )
            .then((res) => {
              console.log(res);
              const totalPrice = res.data.cart.cart_items.reduce(
                (total, item) => {
                  return total + item.price;
                },
                0
              );
              axios.put(
                `${DEFAULT_URL}/api/v1/customer/carts`,
                {
                  cart: {
                    final_price: totalPrice,
                  },
                },
                {
                  headers: {
                    Authorization: `Bearer ${accessToken}`,
                  },
                }
              );
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          addCartItem(foodItemId, quantity, price, accessToken, cartId);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Box>
        <Box
          sx={{ marginX: { xs: 4, sm: 12, md: 32, lg: 44 } }}
          mt={6}
          display="flex"
          justifyContent="space-between"
          mb={2}
        >
          <Typography variant="h5">Food Items</Typography>
          <Button
            onClick={handleGoBack}
            variant="outlined"
            startIcon={<ArrowBackIcon />}
          >
            Back
          </Button>
        </Box>
        <Grid
          sx={{ paddingX: { xs: 4, sm: 12, md: 32, lg: 44 }, marginBottom: 6 }}
          container
          spacing={3}
        >
          {foodItems
            .slice(0, showAllItems ? undefined : MAX_DISPLAY_FOOD_ITEMS)
            .map((foodItem) => (
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
            <Button onClick={toggleShowAllItems} variant="outlined">
              {showAllItems
                ? "Show Less"
                : `+ ${foodItems.length - MAX_DISPLAY_FOOD_ITEMS} More`}
            </Button>
          </Box>
        )}
      </Box>
      <Footer/>
    </>
  );
};

export default FoodItemPage;
