import React, { useState } from "react";
import "./header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import { useAuth } from "../../service/authContext";
import Select from "./Select";
import Cart from "./cart";

function Header() {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const [isopen, setIsopen] = useState(false);
  const [isopencart, setIsopencart] = useState(false);
  console.log(isLoggedIn);

  return (
    <div>
      <div className="header-top-wrap container">
        <div className="header-left-wrap">
          <div className="">
            <a className="" style={{ textDecoration: "none" }}>
              <span
                style={{
                  marginLeft: "20px",
                  color: "#006a31",
                  fontSize: "20px",
                  fontWeight: "700",
                }}
              >
                Luxury perfumes
              </span>
            </a>
          </div>
        </div>
        <div className="header-right-wrap">
          <div class="header-form-group" style={{ width: "300px" }}>
            <div style={{ borderColor: "gray" }}>
              <label>
                <em>
                  <FontAwesomeIcon icon={faSearch} />
                </em>
              </label>

              <input
                id="autocomplete-address"
                placeholder="Tìm kiếm món ăn"
                autocomplete="off"
              />
            </div>
          </div>
        </div>
        <div className="header-right-wrap">
          {isLoggedIn ? (
            <div className="header-account">
              <div href="/customer/info" className="header-icon">
                <em>
                  {" "}
                  <FontAwesomeIcon icon={faCircleUser} />
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
          ) : (
            <div
              className="header-account"
              style={{ position: "relative" }}
              onClick={() => setIsopen(!isopen)}
            >
              <div className="header-avata">
                <img
                  src="https://scontent.fdad3-1.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeELxGyg2mn6kaTfBGxUE5VLso2H55p0AlGyjYfnmnQCUX-bqa-3LPxCF3wF2OswuLR0B2Hg3nd_leFWHNPvctOq&_nc_ohc=pBWKZ5fltKgQ7kNvgH3Cy6T&_nc_ht=scontent.fdad3-1.fna&oh=00_AYAP3C-ajo03pbxQQI13W9DNQWElSE1FNkSwqzNSyekmCg&oe=667280F8"
                  alt=""
                />
              </div>
              <div className="header-name">Nguyễn Thanh Lịch</div>
              {isopen ? (
                <div className="box" style={{ marginTop: "10px" }}>
                  <Select />
                  <Select />
                  <Select />
                  <Select />
                </div>
              ) : (
                <></>
              )}
            </div>
          )}
        </div>
      </div>
      <div className=" background_cl ">
        <div className="container header-bottom-wrap">
          <div className="header-left-wrap ">
            <a href="/" className="header-a" key="Trang chủ">
              <span> Trang chủ </span>
            </a>
            <a href="/" className="header-a">
              <span> Nước hoa nam </span>
            </a>
            <a href="/" className="header-a">
              <span> Nước hoa nữ </span>
            </a>
          </div>
          <div className="header-right-wrap">
            <div className="header-mobile-flyout-wrapper">
              <div
                className="header-cart"
                id="topcartlink"
                style={{ position: "relative" }}
                onClick={() => setIsopencart(!isopencart)}
              >
                <div className="header-icon">
                  <a>
                    <em>
                      <FontAwesomeIcon
                        icon={faCartShopping}
                        style={{ fontSize: "18px" }}
                      />
                    </em>
                  </a>
                </div>
                <p
                  style={{
                    marginTop: "0px",
                    marginBottom: "0px",
                    marginLeft: "5px",
                  }}
                >
                  <a style={{ textDecoration: "none", color: "#006a31" }}>
                    {" "}
                    Giỏ hàng{" "}
                  </a>
                </p>

                <div className="header-amount">
                  <span className="header-cart-qty" id="_TotalProducts">
                    0
                  </span>
                </div>

                <div id="flyout-cart" className="header-flyout-cart">
                  {isopencart ? (
                    <div className="box" style={{ width: "450px" }}>
                      <Cart />
                    </div>
                  ) : (
                    <></>
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
