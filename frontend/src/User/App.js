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

function App() {
  return (
    <div style={{ height: "100vh" }}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgetpassword" element={<Forgetpassword />} />
        <Route path="/logout" element={<Forgetpassword />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
