// AuthContext.js

import React, { createContext, useContext, useState } from "react";
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState();
  const [img, setImg] = useState("");

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the AuthContext
export function useAuth() {
  return useContext(AuthContext);
}

// Custom hook to handle logout functionality
export function useLogout() {
  const { setIsLoggedIn, setUserName, setImg } = useAuth();

  function logout() {
    setIsLoggedIn(false);
    setUserName("");
    setImg("");
  }

  return logout;
}
