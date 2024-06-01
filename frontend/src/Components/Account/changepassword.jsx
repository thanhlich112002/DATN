import React, { useState } from "react";
import style from "./Account.css";
import Input from "../../Components/Login/Input";
import Button from "../../Components/Login/button";
import { changepassword } from "../../service/API";
import { useAuth } from "../../service/authContext";

function Changepassword() {
  const { user } = useAuth();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const fetchOrders = async () => {
    try {
      if (user && user.email) {
        const req = await changepassword(
          user.email,
          oldPassword,
          newPassword,
          confirmPassword
        );
        setMessage("Mật khẩu đã được thay đổi thành công!");
      }
    } catch (err) {
      setMessage(
        err.response?.data?.message || "Có lỗi xảy ra. Vui lòng thử lại."
      );
    }
  };

  const handleSubmit = () => {
    if (newPassword !== confirmPassword) {
      setMessage("Mật khẩu mới và xác nhận mật khẩu không khớp!");
    } else {
      fetchOrders();
    }
  };

  return (
    <div className="changepassword">
      <span className="checkout_left_span">Đặt lại mật khẩu</span>
      <div>
        <Input
          title="Mật Khẩu Cũ"
          type="password"
          placeholder="Mật Khẩu Cũ"
          value={oldPassword}
          setValue={setOldPassword}
        />
        <Input
          title="Mật Khẩu Mới"
          type="password"
          placeholder="Mật Khẩu Mới"
          value={newPassword}
          setValue={setNewPassword}
        />
        <Input
          title="Xác Nhận Mật Khẩu Mới"
          type="password"
          placeholder="Xác Nhận Mật Khẩu Mới"
          value={confirmPassword}
          setValue={setConfirmPassword}
        />
        <div className="cart1_button dmk" onClick={handleSubmit}>
          <div className="Cart1_item_rigth">
            <span>Đặt lại mật khẩu</span>
          </div>
        </div>
        <div className="thongbao">{message}</div>
      </div>
    </div>
  );
}

export default Changepassword;
