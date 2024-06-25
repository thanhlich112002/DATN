import React, { useEffect } from "react";
import style from "./Account.css";
import Info from "./info";
import Order from "./order";
import Changepassword from "./changepassword";
import { useParams } from "react-router-dom";
import Address from "./address";
import Form from "./form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../service/authContext";

function Account() {
  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();
  const handleNav = (nav) => {
    navigate(`/account/${nav}`);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container_cus">
      <div className="account">
        <div className="account_left">
          <span className="checkout_left_span">TRANG TÀI KHOẢN</span>
          <div onClick={() => handleNav("info")}>Thông tin tài khoản</div>
          <div onClick={() => handleNav("orders")}>Đơn hàng của bạn</div>
          <div onClick={() => handleNav("changepassword")}>Đổi mật khẩu</div>
          <div onClick={() => handleNav("addresses")}>Địa chỉ</div>
        </div>
        <div className="account_right">
          {id === "info" && <Info />}
          {id === "orders" && <Order />}
          {id === "changepassword" && <Changepassword />}
          {id === "addresses" && <Address />}
          {id === "form" && <Form />}
        </div>
      </div>
    </div>
  );
}

export default Account;
