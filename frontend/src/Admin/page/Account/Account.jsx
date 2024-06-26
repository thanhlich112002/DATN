import React, { useEffect } from "react";
import style from "./Account.css";
import Info from "./info";
import Order from "./order";
import Changepassword from "./changepassword";
import { useParams } from "react-router-dom";
import Address from "./address";
import Form from "./form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../service/authContext";

function Account({ setIsLoading }) {
  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();
  const handleNav = (nav) => {
    navigate(`/admin/account/${nav}`);
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
          <div onClick={() => handleNav("changepassword")}>Đổi mật khẩu</div>
          <div onClick={() => handleNav("addresses")}>Địa chỉ</div>
        </div>
        <div className="account_right">
          {id === "info" && <Info setIsLoading={setIsLoading} />}
          {id === "changepassword" && (
            <Changepassword setIsLoading={setIsLoading} />
          )}
          {id === "addresses" && <Address setIsLoading={setIsLoading} />}
          {id === "form" && <Form setIsLoading={setIsLoading} />}
        </div>
      </div>
    </div>
  );
}

export default Account;
