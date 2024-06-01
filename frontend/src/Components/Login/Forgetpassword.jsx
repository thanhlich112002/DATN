import React from "react";
import Input from "./Input";
import Button from "./button";
import { logoutAPI } from "../../service/API";
import { useAuth, useLogout } from "../../service/authContext";
import { useNavigate } from "react-router-dom";

function Forgetpassword() {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn, user, setUser } = useAuth();
  const logout = useLogout();
  const handleSubmit = async () => {
    try {
      const res = await logoutAPI();
      if (res.status === 200) {
        navigate("/");
        localStorage.removeItem("token");
        logout();
      } else {
        // Handle the case where the logout was not successful
        console.error("Logout failed", res.status);
      }
    } catch (error) {
      console.error("An error occurred during logout", error);
    }
  };

  return (
    <div className="container" onClick={() => handleSubmit()}>
      <div className="form-group w40">
        <h2 className="lineup">Quên mật khẩu</h2>
        <Input title="E-mail" type="text" placeholder="E-mail" />
        <Button title="Đổi mật khẩu" />
      </div>
    </div>
  );
}

export default Forgetpassword;
