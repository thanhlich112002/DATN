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

function Header() {
  const navigate = useNavigate();
  const { isLoggedIn, user } = useAuth();
  const logout = useLogout();
  const { cart } = useUser();
  const [isopen, setIsopen] = useState(false);
  const [isopencart, setIsopencart] = useState(false);

  const accountMenuRef = useRef(null);
  const cartRef = useRef(null);
  const Nav = () => {
    navigate("/account/info");
  };
  const NavF = () => {
    navigate("/Favorite");
  };
  const NavFa = () => {
    navigate("/");
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

  return (
    <div>
      <div className="background_cl">
        <div className="header-top-wrap container_cus">
          <div className="header-right-wrap">
            <div className="header-form-group" style={{ width: "300px" }}>
              <div style={{ borderColor: "gray" }}>
                <label>
                  <em>
                    <FontAwesomeIcon icon={faSearch} />
                  </em>
                </label>

                <input
                  id="autocomplete-address"
                  placeholder="Tìm kiếm sản phẩm"
                  autoComplete="off"
                />
              </div>
            </div>
          </div>
          <div className="header-left-wrap">
            <div className="">
              <a className="" style={{ textDecoration: "none" }}>
                <span
                  onClick={() => NavFa()}
                  style={{
                    marginLeft: "20px",
                    color: "#ffffff",
                    fontSize: "20px",
                    fontWeight: "700",
                    cursor: "pointer",
                  }}
                >
                  Luxury perfumes
                </span>
              </a>
            </div>
          </div>
          <div className="header-right-wrap">
            {isLoggedIn ? (
              <div
                className="header-account"
                style={{ position: "relative" }}
                onClick={toggleAccountMenu}
                ref={accountMenuRef}
              >
                {/* <div className="header-avata">
                  <img src={user?.photo} alt="" />
                </div> */}
                <div
                  className="header-name"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "end",
                    gap: "5px",
                  }}
                >
                  <span>Xin chào : {user.lastName + " " + user.firstName}</span>
                  <span>Tài khoản hoặc đăng xuất</span>
                </div>
                {isopen && (
                  <div className="box" style={{ marginTop: "10px" }}>
                    <Select
                      title={"Quản lý tài khoản"}
                      icon={faGear}
                      actions={Nav}
                    />
                    <Select
                      title={"Đăng xuất"}
                      actions={logout}
                      icon={faRightFromBracket}
                    />
                  </div>
                )}
              </div>
            ) : (
              <div className="header-account">
                <div href="/customer/info" className="header-icon">
                  <em>
                    {" "}
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
                  <span>/</span>
                  <a
                    href="/register"
                    className="header-login"
                    style={{ textDecoration: "none" }}
                  >
                    Tạo tài khoản
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="">
        <div className="container_cus header-bottom-wrap">
          <div className="header-left-wrap">
            <a href="/" className="header-a" key="Trang chủ">
              <span> Trang chủ </span>
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
                      ref={cartRef}
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
