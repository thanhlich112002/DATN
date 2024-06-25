// AuthContext.js

import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

// Cung cấp ngữ cảnh xác thực cho ứng dụng
export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = JSON.parse(localStorage.getItem("setUser"));

    if (token && storedUser) {
      setIsLoggedIn(true);
      setUser(storedUser);
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook để sử dụng ngữ cảnh xác thực
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
