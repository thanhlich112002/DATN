import React from "react";
import "./Login.css";
import Input from "./Input";
import Button from "./button";

function Register() {
  return (
    <div className="container">
      <div className="form-group w40">
        <h2 className="lineup">Tạo tài khoản</h2>
        <Input title="Tên" type="text" placeholder="Tên" />
        <Input title="Số điện thoại" type="text" placeholder="Số điện thoại" />
        <Input title="Họ" type="text" placeholder="Họ" />
        <Input title="E-mail" type="text" placeholder="E-mail" />
        <Input title="Mật khẩu" type="text" placeholder="Mật khẩu" />
        <Input
          title="Xác nhận mật khẩu"
          type="text"
          placeholder="Xác nhận mật khẩu"
        />
        <Button title="Đăng ký" />
      </div>
    </div>
  );
}

export default Register;
