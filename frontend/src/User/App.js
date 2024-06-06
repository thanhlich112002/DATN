import "./App.css";
import Header from "../Components/Header/header";
import Login from "../Components/Login/Login";
import Register from "../Components/Login/Register";
import Forgetpassword from "../Components/Login/Forgetpassword";
import Footer from "../Components/Footer/Footer";
import Home from "../Components/Home/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Collections from "../Components/Collections/Collections";
import Cart from "../Components/Cart/Cart";

import Product from "../Components/Product/Product";
import Checkout from "../Components/Checkout/Checkout";
import Account from "../Components/Account/Account";
import Favorite from "../Components/Favorite/Favorite";

function App() {
  return (
    <div style={{ height: "100vh" }}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgetpassword" element={<Forgetpassword />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/favorite" element={<Favorite />} />
        <Route path="/account/:i" element={<Account />} />
        <Route path="/logout" element={<Forgetpassword />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
