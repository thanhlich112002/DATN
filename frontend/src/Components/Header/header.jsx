import React from "react";
import "./header.css";
import logo from "../../User/logo192.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
function header() {
  return (
    <div className="container">
      <div className="header-top-wrap">
        <div className="header-left-wrap">
          <div className="">
            <a className="" style={{ textDecoration: "none" }}>
              <img
                src={logo}
                alt="The Pizza Home"
                title="The Pizza Company"
                style={{ width: "70px", height: "70px", cursor: "pointer" }}
              />

              <span
                style={{
                  marginLeft: "20px",
                  color: "#006a31",
                  fontSize: "20px",
                  fontWeight: "700",
                }}
              >
                Pizza Home
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
          <div className="header-account">
            <div href="/customer/info" className="header-icon">
              <em>
                {" "}
                <FontAwesomeIcon icon={faCircleUser} />
              </em>
            </div>
            <div className="header-login-and-register">
              <a className="header-register" style={{ textDecoration: "none" }}>
                Đăng nhập
              </a>
              <span>/</span>
              <a className="header-login" style={{ textDecoration: "none" }}>
                Tạo tài khoản
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="header-bottom-wrap background_cl">
        <div className="header-left-wrap">
          <a href="/" className="header-a" key="Trang chủ">
            <span> Trang chủ </span>
          </a>
          <a href="/" className="header-a">
            <span> Pizza </span>
          </a>
        </div>
        <div className="header-right-wrap">
          <div className="header-mobile-flyout-wrapper">
            <div className="header-cart" id="topcartlink">
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

              <div
                id="flyout-cart"
                className="header-flyout-cart"
                data-removeitemfromcarturl="/EmporiumTheme/RemoveItemFromCart"
                data-flyoutcarturl="/EmporiumTheme/FlyoutShoppingCart"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default header;
