import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import Input from "./Input";
import Button from "./button";
import { loginAPI } from "../../service/API";
import { useAuth } from "../../service/authContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  console.log(email);

  const { isLoggedIn, setIsLoggedIn, user, setUser } = useAuth();
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    try {
      if (!email) {
        setMessage("Vui lòng nhập email");
        return;
      }
      if (!password) {
        setMessage("Vui lòng nhập mật khẩu");
        return;
      }

      let res = await loginAPI({
        password: password,
        email: email,
      });

      setIsLoggedIn(true);
      setUser(res.data.data.user);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("setUser", JSON.stringify(res.data.data.user));

      const userRole = res.data.data.user.role;

      if (userRole === "User") {
        navigate("/"); // Thay đổi điều kiện này nếu cần
      } else if (userRole === "Admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (e) {
      // setMessage(e.Error);
      console.error(e.response.data.message);
    }
  };

  return (
    <div className="container">
      <div className="form-group w40">
        <h2 className="lineup">Đăng nhập</h2>
        <Input
          title="Email"
          type="email"
          placeholder="Email"
          value={email}
          setValue={setEmail}
        />
        <Input
          title="Mật Khẩu"
          type="password"
          placeholder="Mật Khẩu"
          value={password}
          setValue={setPassword}
        />
        <div className="mgt10">
          <a className="a" href="/forgetpassword">
            Quên mật khẩu
          </a>
        </div>
        <div className="mgt10">
          Bạn chưa có tài khoản?:{""}
          <a href="/register" className="a">
            Đăng ký
          </a>
        </div>
        <div>
          <div className="thongbao">{message}</div>
        </div>
        <Button title="Đăng nhập" handle={handleSubmit} />
      </div>
    </div>
  );
}

export default Login;
