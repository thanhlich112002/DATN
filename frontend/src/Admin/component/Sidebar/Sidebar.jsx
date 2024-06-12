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
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink, useLocation } from "react-router-dom";
import "./style.css";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  const navigate = useNavigate();
  const [active, setActive] = useState("/admin");

  const menuItem = [
    {
      path: "/admin",
      name: "Danh sách",
      icon: faHouse,
    },
    {
      path: "/admin/product",
      name: "Danh sách sản phẩm",
      icon: faPizzaSlice,
    },
    {
      path: "/admin/category",
      name: "Danh mục",
      icon: faListAlt,
    },
    {
      path: "/admin/voucher",
      name: "QL giảm giá",
      icon: faTags,
    },
    {
      path: "/admin/brand",
      name: "Thương hiệu",
      icon: faTags,
    },
    {
      path: "/admin/order",
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
      <aside id="sidebar" className={isOpen ? "expand" : ""}>
        <div className="sidebar-link" onClick={toggle}>
          <i>
            {" "}
            <FontAwesomeIcon icon={faBars} />
          </i>
        </div>
        <ul className="sidebar-nav">
          {menuItem.map((item, index) => (
            <li
              key={index}
              className={`sidebar-item ${active === item.path ? "ATV" : ""}`}
              onClick={() => {
                navigate(`${item.path}`);
                setActive(item.path);
              }}
            >
              <div className="sidebar-link">
                <i>
                  <FontAwesomeIcon icon={item.icon} />
                </i>
                {isOpen ? <span>{item.name}</span> : <></>}
              </div>
            </li>
          ))}
        </ul>
        <div className="sidebar-footer">
          <div href="#" className="sidebar-link" onClick={handleLogout}>
            <FontAwesomeIcon icon={faExclamationTriangle} />
            {isOpen ? <span>Logout</span> : <></>}
          </div>
        </div>
      </aside>
      <main-sider>{children}</main-sider>
    </div>
  );
};

export default Sidebar;
