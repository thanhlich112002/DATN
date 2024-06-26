import "./App.css";
import Header from "../Components/Header/header";
import Login from "../Components/Login/Login";
import Register from "../Components/Login/Register";
import Forgetpassword from "../Components/Login/Forgetpassword";
import Footer from "../Components/Footer/Footer";
import Home from "../Components/Home/Home";
import { Route, Routes, Navigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Collections from "../Components/Collections/Collections";
import Cart from "../Components/Cart/Cart";
import Introduce from "../Components/Gioithieu/Gioithieu";
import Product from "../Components/Product/Product";
import Checkout from "../Components/Checkout/Checkout";
import Account from "../Components/Account/Account";
import Favorite from "../Components/Favorite/Favorite";

import LoadingModal from "../Components/Loading/Loading";
import { useState } from "react";
const ProtectedRoute = ({ element, role }) => {
  const user = localStorage.getItem("setUser");
  const userData = JSON.parse(user);
  if (userData.role === "User") {
    return element;
  } else {
    return <Navigate to="/login" />;
  }
};

function App({ role }) {
  console.log(role);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div style={{ height: "100vh" }}>
      {isLoading ? <LoadingModal /> : <></>}
      <Header />
      <Routes>
        <Route path="/" element={<Home setIsLoading={setIsLoading} />} />
        <Route path="/login" element={<Login setIsLoading={setIsLoading} />} />
        <Route
          path="/register"
          element={<Register Collections setIsLoading={setIsLoading} />}
        />
        <Route
          path="/collections"
          element={<Collections setIsLoading={setIsLoading} />}
        />

        <Route
          path="/forgetpassword"
          element={<Forgetpassword setIsLoading={setIsLoading} />}
        />
        <Route
          path="/product/:id"
          element={<Product setIsLoading={setIsLoading} />}
        />
        <Route
          path="/introduce"
          element={<Introduce setIsLoading={setIsLoading} />}
        />
        <Route
          path="/cart"
          element={<Cart Collections setIsLoading={setIsLoading} />}
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute
              role={role}
              element={<Checkout setIsLoading={setIsLoading} />}
            />
          }
        />
        <Route
          path="/favorite"
          element={
            <ProtectedRoute
              role={role}
              element={<Favorite setIsLoading={setIsLoading} />}
            />
          }
        />
        <Route
          path="/account/:id"
          element={
            <ProtectedRoute
              role={role}
              element={<Account setIsLoading={setIsLoading} />}
            />
          }
        />
        <Route
          path="/logout"
          element={<Forgetpassword setIsLoading={setIsLoading} />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
