import React, { useState } from "react";
import Input from "./Input";
import Button from "./button";
import { useNavigate } from "react-router-dom";
import { resetPassword, verifyToken, forgetPassword } from "../../service/API";
import { toast } from "react-toastify";

function Forgetpassword({ setIsLoading }) {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [form, setForm] = useState(1);
  const navigate = useNavigate();
  const handleForgetPassword = async () => {
    try {
      setIsLoading(true);
      await forgetPassword(email);
      setForm(2);
      setIsLoading(false);
      console.log("Email xác nhận đã được gửi.");
    } catch (error) {
      console.error("Đã xảy ra lỗi khi yêu cầu quên mật khẩu", error);
      toast.error(error.response.data.message);
      setIsLoading(false);
    }
  };

  const handleVerifyToken = async () => {
    try {
      setIsLoading(true);
      await verifyToken(email, token);
      setIsLoading(false);
      setForm(3);
      console.log("Token đã được xác nhận.");
    } catch (error) {
      toast.error(error.response.data.message);
      setIsLoading(false);
    }
  };

  const handleResetPassword = async () => {
    try {
      setIsLoading(true);
      await resetPassword(email, {
        newPassword: newPassword,
        comfirmPassword: newPassword,
        signUpToken: token,
      });
      setIsLoading(false);
      console.log("Mật khẩu đã được đặt lại thành công.");
      toast.success("Đổi mật khẩu thành công");
      navigate("/login");
    } catch (error) {
      toast.error(error.response.data.message);
      setIsLoading(false);
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
