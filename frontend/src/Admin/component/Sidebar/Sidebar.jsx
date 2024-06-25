import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartBar,
  faListAlt,
  faTags,
  faUser,
  faPercent,
  faShoppingBasket,
  faSignOutAlt,
  faBars,
  faFlask,
  faAd,
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
      name: "Thống kê",
      icon: faChartBar,
    },
    {
      path: "/admin/product",
      name: "QL Sản phẩm",
      icon: faFlask,
    },
    {
      path: "/admin/category",
      name: "QL Danh mục",
      icon: faListAlt,
    },
    {
      path: "/admin/brand",
      name: "QL Thương hiệu",
      icon: faTags,
    },
    {
      path: "/admin/user",
      name: "QL Người dùng",
      icon: faUser,
    },
    {
      path: "/admin/voucher",
      name: "QL Giảm giá",
      icon: faPercent,
    },
    {
      path: "/admin/order",
      name: "QL Đơn hàng",
      icon: faShoppingBasket,
    },
    {
      path: "/admin/slidebar",
      name: "QL Quảng cáo",
      icon: faAd,
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
            <FontAwesomeIcon icon={faSignOutAlt} />
            {isOpen ? <span>Đăng xuất</span> : <></>}
          </div>
        </div>
      </aside>
      <main-sider>{children}</main-sider>
    </div>
  );
};

export default Sidebar;
