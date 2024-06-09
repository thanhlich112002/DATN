import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPizzaSlice,
  faListAlt,
  faTags,
  faHouse,
  faShoppingBasket,
  faSignOutAlt,
  faChevronLeft,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink, useLocation } from "react-router-dom";
import "./style.css";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItem = [
    {
      path: "/admin",
      name: "Danh sách",
      icon: faHouse,
    },
    {
      path: "/admin/tableProduct",
      name: "Danh sách sản phẩm",
      icon: faPizzaSlice,
    },
    {
      path: "/admin/tableCategory",
      name: "Danh mục",
      icon: faListAlt,
    },
    {
      path: "/admin/managevoucher",
      name: "QL giảm giá",
      icon: faTags,
    },
    // {
    //   path: "/admin/manageuser",
    //   name: "Danh sách khách hàng",
    //   icon: faUsers,
    // },
    {
      path: "/admin/manageorder",
      name: "Đơn hàng",
      icon: faShoppingBasket,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("setUser");
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="container-admin">
      <div
        style={{
          width: isOpen ? "260px" : "60px",
          minWidth: isOpen ? "260px" : "60px",
        }}
        className="sidebar-admin"
      >
        <div className="top_section">
          <div className="bars">
            {isOpen ? (
              <FontAwesomeIcon icon={faChevronLeft} onClick={toggle} />
            ) : (
              <FontAwesomeIcon icon={faBars} onClick={toggle} />
            )}
          </div>
        </div>
        {menuItem.map((item, index) => (
          <NavLink to={item.path} key={index} className={`link`}>
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
