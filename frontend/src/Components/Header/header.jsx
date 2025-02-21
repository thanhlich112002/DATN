import React, { useState, useRef, useEffect } from "react";
import "./header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import { useAuth, useLogout } from "../../service/authContext";
import Select from "./Select";
import Cart from "./cart";
import {
  faRightFromBracket,
  faGear,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { useUser } from "../../service/userContext";
import { useNavigate } from "react-router-dom";
import myImage from "../../Components/assets/imgs/95cb7bec-2941-4e11-a47e-1d456f78d912.jpg";

function Header() {
  const navigate = useNavigate();
  const { isLoggedIn, user } = useAuth();
  const logout = useLogout();
  const { cart } = useUser();
  const [isopen, setIsopen] = useState(false);
  const [isopencart, setIsopencart] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const ref = useRef(null);
  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setSearchTerm(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const Nav = () => {
    navigate("/account/info");
  };
  const NavF = () => {
    navigate("/Favorite");
  };
  const NavO = () => {
    logout();
    navigate("/login");
  };

  const toggleAccountMenu = () => {
    setIsopen(!isopen);
    if (isopencart) {
      setIsopencart(false);
    }
  };

  const toggleCart = () => {
    setIsopencart(!isopencart);
    if (isopen) {
      setIsopen(false);
    }
  };

  const handleNavClick = () => {
    navigate(`/collections?query=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <div>
      <div className="background_cl">
        <div className="header-top-wrap container_cus">
          <div className="header-right-wrap">
            <div className="header-form-group" style={{ width: "300px" }}>
              <div style={{ borderColor: "gray" }}>
                <label onClick={handleNavClick}>
                  <em>
                    <FontAwesomeIcon icon={faSearch} />
                  </em>
                </label>
                <input
                  onChange={(e) => setSearchTerm(e.target.value)}
                  id="autocomplete-address"
                  placeholder="Tìm kiếm sản phẩm"
                  autoComplete="off"
                />
              </div>
            </div>
          </div>
          <div className="header-left-wrap">
            <div className="">
              <img src={myImage} alt="" style={{ height: "60px" }} />
            </div>
          </div>
          <div className="header-right-wrap">
            {isLoggedIn ? (
              <div
                className="header-account"
                style={{ position: "relative" }}
                onClick={toggleAccountMenu}
              >
                <div
                  className="header-name"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "end",
                    gap: "5px",
                  }}
                >
                  <span>Xin chào: {user.lastName + " " + user.firstName}</span>
                  <span>Thông tin tài khoản</span>
                </div>
                {isopen && (
                  <div className="box" style={{ marginTop: "10px" }} ref={ref}>
                    <Select
                      title={"Quản lý tài khoản"}
                      icon={faGear}
                      actions={Nav}
                    />
                    <Select
                      title={"Đăng xuất"}
                      actions={NavO}
                      icon={faRightFromBracket}
                    />
                  </div>
                )}
              </div>
            ) : (
              <div className="header-account">
                <div className="header-icon">
                  <em>
                    <FontAwesomeIcon
                      icon={faCircleUser}
                      style={{ color: "#ffffff" }}
                    />
                  </em>
                </div>
                <div className="header-login-and-register">
                  <a
                    href="/login"
                    className="header-register"
                    style={{ textDecoration: "none" }}
                  >
                    Đăng nhập
                  </a>
                  <span style={{ color: "#ffffff", margin: "0px 3px" }}>/</span>
                  <a
                    href="/register"
                    className="header-login"
                    style={{ textDecoration: "none" }}
                  >
                    Đăng ký
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
        <div className="container_cus header-bottom-wrap">
          <div className="header-left-wrap">
            <a href="/" className="header-a">
              <span>Trang chủ</span>
            </a>
            <a href="/introduce" className="header-a">
              <span>Giới thiệu</span>
            </a>
            <a href="/collections" className="header-a">
              <span>Sản phẩm</span>
            </a>
          </div>
          <div className="header-right-wrap">
            <div className="header-mobile-flyout-wrapper">
              <div
                className="header-cart"
                id="topcartlink"
                style={{ position: "relative" }}
              >
                <div className="header-icon">
                  <a style={{ display: "flex", gap: "20px" }}>
                    <em onClick={() => NavF()}>
                      <FontAwesomeIcon
                        icon={faHeart}
                        style={{ fontSize: "24px", color: "#07503d" }}
                      />
                    </em>
                    <em
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleCart();
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faCartShopping}
                        style={{ fontSize: "24px", color: "#07503d" }}
                      />
                    </em>
                  </a>
                </div>
                <div className="header-amount">
                  <span className="header-cart-qty" id="_TotalProducts">
                    {cart.length}
                  </span>
                </div>
                <div id="flyout-cart" className="header-flyout-cart">
                  {isopencart && (
                    <div
                      className="box"
                      style={{ width: "450px" }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Cart setIsopencart={setIsopencart} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
