import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faArrowLeft, faPizzaSlice, faUser, faShoppingCart, faChevronLeft, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import './style.css';
import logo from "../../assets/imgs/logoPizza.png"
import { useNavigate } from "react-router-dom";
import { useLogout } from "../../service/authContext";



const Sidebar = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const menuItem = [
        {
            path: "/",
            name: "Cập nhật món ăn",
            icon: <FontAwesomeIcon icon={faPizzaSlice} />
        },
        {
            path: "/user",
            name: "Danh sách khách hàng",
            icon: <FontAwesomeIcon icon={faUser} />
        },
        {
            path: "/order",
            name: "Đơn hàng",
            icon: <FontAwesomeIcon icon={faShoppingCart} />
        },

    ]
    const navigate = useNavigate();

    const logout = useLogout();

    const handleLogout = () => {
        logout();
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
        window.location.reload();
    }

    return (
        <div className="container-admin">
            <div style={{ width: isOpen ? "260px" : "60px" }} className="sidebar-admin">
                <div className="top_section">
                    <div className='logo' style={{ display: isOpen ? "inline" : "none" }}>
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
                {
                    menuItem.map((item, index) => (
                        <NavLink to={item.path} key={index} className="link" activeclassName="active">
                            <div className="icon">{item.icon}</div>
                            <div style={{ display: isOpen ? "inline" : "none" }} className="link_text">{item.name}</div>
                        </NavLink>


                    ))
                }

                <div className="link" style={{ cursor: 'pointer' }} onClick={handleLogout}>
                    <div className="icon"><FontAwesomeIcon icon={faArrowRightFromBracket} /></div>
                    <div style={{ display: isOpen ? "inline" : "none" }} className="link_text">Đăng xuất</div>
                </div>
            </div>
            <main-sider>{children}</main-sider>
        </div>
    );
};

export default Sidebar;