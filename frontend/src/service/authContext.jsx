// AuthContext.js

import React, { createContext, useContext, useEffect, useState } from "react";
import { GetUserByToken } from "./API";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    setUser(JSON.parse(localStorage.getItem("setUser")));
    if (token) setIsLoggedIn(true);
  }, [isLoggedIn]);
  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export function useLogout() {
  const { setIsLoggedIn, setUser } = useAuth();

  function logout() {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("setUser");
  }

  return logout;
}
