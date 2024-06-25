import React from "react";
import User from "./User/App";
import Admin from "./Admin/App";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./service/authContext";
import { UserProvider } from "./service/userContext";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const UserRoute = ({ element, role }) => {
    const user = localStorage.getItem("setUser");
    if (user) {
      const userData = JSON.parse(user);
      if (userData.role === role) {
        return element;
      } else {
        if (userData.role === "User") {
          return <User />;
        } else if (userData.role === "Admin") {
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
            <Route path="/*" element={<UserRoute />} />
            <Route path="/admin/*" element={<UserRoute />} />
          </Routes>
        </Router>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
