import React from "react";
import User from "./User/App";
import Admin from "./Admin/App";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AuthProvider } from "./service/authContext";
import { UserProvider } from "./service/userContext";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <Router>
          <Routes>
            <Route
              path="/*"
              element={<User element={<User />} role="User" />}
            />
            <Route
              path="/admin/*"
              element={<Admin element={<Admin />} role="Admin" />}
            />
          </Routes>
        </Router>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
