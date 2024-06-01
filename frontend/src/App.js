import React from "react";
import User from "./User/App";
import Admin from "./Admin/App";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AuthProvider } from "./service/authContext";
import { UserProvider } from "./service/userContext";

function App() {
  const UserRoute = ({ element, role }) => {
    const user = localStorage.getItem("user");
    if (user) {
      const userData = JSON.parse(user);
      if (userData.role === role) {
        return element;
      } else {
        if (userData.role === "User") {
          // return <Navigate to="/"/>;
          return <User />;
        } else if (userData.role === "Admin") {
          // return <Navigate to="/admin/"/>;
          return <Admin />;
        }
      }
    } else {
      return <User />;
    }
  };
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
