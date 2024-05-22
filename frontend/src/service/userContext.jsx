// UserContext.js

import React, { createContext, useContext, useState } from "react";

// Create the UserContext
const UserContext = createContext();

// UserProvider component to wrap around the parts of the app that need access to user state
export function UserProvider({ children }) {
  // State for the cart, initialized with some default items
  const [cart, setCart] = useState([]);

  // State for the user's name
  const [userName, setUserName] = useState("");
  // State for the user's default contact information
  const [defaultContact, setDefaultContact] = useState({});

  return (
    <UserContext.Provider
      value={{
        cart,
        setCart,
        userName,
        setUserName,
        defaultContact,
        setDefaultContact,
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
