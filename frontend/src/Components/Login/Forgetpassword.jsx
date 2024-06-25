import React, { useState } from "react";
import Input from "./Input";
import Button from "./button";
import { useNavigate } from "react-router-dom";
import { resetPassword, verifyToken, forgetPassword } from "../../service/API";
import { toast } from "react-toastify";

function Forgetpassword() {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [form, setForm] = useState(1);
  const navigate = useNavigate();

  const handleForgetPassword = async () => {
    try {
      await forgetPassword(email);
      setForm(2);
      console.log("Email xác nhận đã được gửi.");
    } catch (error) {
      console.error("Đã xảy ra lỗi khi yêu cầu quên mật khẩu", error);
    }
  };

  const handleVerifyToken = async () => {
    try {
      await verifyToken(email, token);
      setForm(3);
      console.log("Token đã được xác nhận.");
    } catch (error) {
      console.error("Đã xảy ra lỗi khi xác nhận token", error);
    }
  };

  const handleResetPassword = async () => {
    try {
      await resetPassword(email, {
        newPassword: newPassword,
        comfirmPassword: newPassword,
        signUpToken: token,
      });
      console.log("Mật khẩu đã được đặt lại thành công.");
      toast.success("Đổi mật khẩu thành công");
      navigate("/login");
    } catch (error) {
      console.error("Đã xảy ra lỗi khi đặt lại mật khẩu", error);
    }
  };

  return (
    <div>
      {form === 1 ? (
        <div className="container">
          <div className="form-group w40">
            <h2 className="lineup">Quên mật khẩu</h2>
            <Input
              title="E-mail"
              type="text"
              placeholder="E-mail"
              value={email}
              setValue={setEmail}
            />
            <Button
              title="Yêu cầu quên mật khẩu"
              handle={handleForgetPassword}
            />
          </div>
        </div>
      ) : (
        <></>
      )}
      {form === 2 ? (
        <div className="container">
          <div className="form-group w40">
            <h2 className="lineup">Xác nhận Token</h2>
            <Input
              title="Token"
              type="text"
              placeholder="Token"
              value={token}
              setValue={setToken}
            />
            <Button title="Xác nhận Token" handle={handleVerifyToken} />
          </div>
        </div>
      ) : (
        <></>
      )}
      {form === 3 ? (
        <div className="container">
          <div className="form-group w40">
            <h2 className="lineup">Đặt lại mật khẩu</h2>
            <Input
              title="Mật khẩu mới"
              type="password"
              placeholder="Mật khẩu mới"
              value={newPassword}
              setValue={setNewPassword}
            />
            <Button title="Đặt lại mật khẩu" handle={handleResetPassword} />
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Forgetpassword;
