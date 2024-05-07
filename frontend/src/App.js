import React from "react";
import User from "./User/App";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<User element={<User />} role="User" />} />
        {/* <Route
          path="/admin/*"
          element={<UserRoute element={<Admin />} role="Admin" />}
        /> */}
      </Routes>
    </Router>
  );
}

export default App;
