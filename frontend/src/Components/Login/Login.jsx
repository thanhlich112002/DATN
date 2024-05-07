import React from "react";
import "./Login.css";
import Input from "./Input";
import Button from "./button";

function Login() {
  return (
    <div className="container">
      <div className="form-group">
        <h2 className="lineup">Đăng nhập</h2>
        <Input title="Email" type="text" placeholder="Email" />
        <Input title="Email" type="text" placeholder="Email" />
        <div className="mgt10">
          {" "}
          <a href="">Quên mật khẩu</a>
        </div>
        <div className="mgt10">
          {" "}
          Bạn chưa có tài khoản: <a href="">Đăng ký</a>
        </div>

        <Button />
      </div>
    </div>
  );
}

export default Login;
