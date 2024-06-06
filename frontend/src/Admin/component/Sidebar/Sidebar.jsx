import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPizzaSlice,
  faListAlt,
  faTags,
  faUsers,
  faShoppingBasket,
  faSignOutAlt,
  faChevronLeft,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import "./style.css";
import logo from "../../assets/imgs/logoPizza.png";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);

  const menuItem = [
    {
      path: "/admin/tableProduct",
      name: "Danh sách sản phẩm",
      icon: faPizzaSlice,
    },
    {
      path: "/admin/tableProduct",
      name: "Danh mục",
      icon: faListAlt,
    },
    {
      path: "/admin/tableProduct",
      name: "Thương hiệu",
      icon: faTags,
    },
    {
      path: "/admin/",
      name: "Danh sách khách hàng",
      icon: faUsers,
    },
    {
      path: "/order",
      name: "Đơn hàng",
      icon: faShoppingBasket,
    },
    {
      path: "/logout",
      name: "Đăng xuất",
      icon: faSignOutAlt,
    },
  ];

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="container-admin">
      <div
        style={{ width: isOpen ? "260px" : "60px" }}
        className="sidebar-admin"
      >
        <div className="top_section">
          <div className="logo" style={{ display: isOpen ? "inline" : "none" }}>
            <img src={logo} alt="logo" />
          </div>
          <div className="bars">
            {isOpen ? (
              <FontAwesomeIcon icon={faChevronLeft} onClick={toggle} />
            ) : (
              <FontAwesomeIcon icon={faBars} onClick={toggle} />
            )}
          </div>
        </div>
        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="link"
            activeClassName="active"
          >
            <div className="icon">
              <FontAwesomeIcon icon={item.icon} />
            </div>
            <div
              style={{ display: isOpen ? "inline" : "none" }}
              className="link_text"
            >
              {item.name}
            </div>
          </NavLink>
        ))}

        <div
          className="link"
          style={{ cursor: "pointer" }}
          onClick={handleLogout}
        >
          <div className="icon">
            <FontAwesomeIcon icon={faSignOutAlt} />
          </div>
          <div
            style={{ display: isOpen ? "inline" : "none" }}
            className="link_text"
          >
            Đăng xuất
          </div>
        </div>
      </div>
      <main-sider>{children}</main-sider>
    </div>
  );
};

export default Sidebar;
