import React, { createContext, useContext, useState, useEffect } from "react";

// Create the UserContext
const UserContext = createContext();

// UserProvider component to wrap around the parts of the app that need access to user state
export function UserProvider({ children }) {
  // State for the cart, initialized with items from localStorage or an empty array
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // State for the user's name
  const [userName, setUserName] = useState("");
  // State for the user's default contact information
  const [defaultContact, setDefaultContact] = useState({});

  // Effect to update localStorage whenever the cart changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cart));
  }, [cart]);

  // Function to add item to cart
  const addToCart = (item) => {
    console.log(item);
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1, noti: item.noti }
            : cartItem
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  // Function to remove item from cart
  const removeFromCart = (item) => {
    console.log(item);
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      if (existingItem.quantity > 1) {
        setCart(
          cart.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity - 1 }
              : cartItem
          )
        );
      } else {
        setCart(cart.filter((cartItem) => cartItem.id !== item.id));
      }
    }
  };

  return (
    <UserContext.Provider
      value={{
        cart,
        setCart,
        userName,
        setUserName,
        defaultContact,
        setDefaultContact,
        addToCart,
        removeFromCart,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

// Custom hook to use the UserContext
export function useUser() {
  return useContext(UserContext);
}
