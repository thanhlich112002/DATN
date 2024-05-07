import React from "react";
import "./Login.css";
import Input from "./Input";
import Button from "./button";

function Login() {
  return (
    <div className="container">
      <div className="form-group">
        <h2 className="lineup">Đăng ký</h2>
        <Input></Input>
        <Input></Input>
        <Button />
      </div>
    </div>
  );
}

export default Login;
