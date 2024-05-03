import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import DEFAULT_URL from '../../../../config';
import { useNavigate } from 'react-router-dom';

const CartContext = createContext();



export const CartProvider = ({ children }) => {
  const navigate = useNavigate()
  const [cartId, setCartId] = useState(localStorage.getItem('cart-id'));
  const accessToken = localStorage.getItem('access-token');

  const handleAddToCart = (foodItemId, quantity, price) => {
    if (cartId === null) {
      createCartAndAddItem(foodItemId, quantity, price);
      navigate("/customer/cart")
    } else {
      updateCartItem(foodItemId, quantity, price);
      navigate("/customer/cart")
    }
  };

  const createCartAndAddItem = (foodItemId, quantity, price) => {
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
        const newCartId = res.data.cart.id;
        localStorage.setItem('cart-id', newCartId);
        setCartId(newCartId);
        addCartItem(foodItemId, quantity, price);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addCartItem = (foodItemId, quantity, price) => {
    axios
      .post(
        `${DEFAULT_URL}/api/v1/customer/carts/cart_items`,
        {
          cart_item: {
            food_item_id: foodItemId,
            quantity: quantity,
            price: price,
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

  const updateCartItem = (foodItemId, quantity, price) => {
    axios
      .get(`${DEFAULT_URL}/api/v1/customer/cart`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        const cartItems = res.data.cart.cart_items;
        const existingCartItem = cartItems.find((item) => item.food_item_id === foodItemId);

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
              const totalPrice = res.data.cart.cart_items.reduce((total, item) => {
                return total + item.price;
              }, 0);
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
          addCartItem(foodItemId, quantity, price);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <CartContext.Provider
      value={{
        handleAddToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
