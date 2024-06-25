import React, { useEffect, useState } from "react";
import { updateUser, getUser } from "../../service/API";
import { toast } from "react-toastify";
import { useAuth } from "../../service/authContext";

function Info({ setIsLoading }) {
  const { setUser } = useAuth();
  const [user, setuser] = useState();
  const [formData, setFormData] = useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
  });
  const getUserData = async () => {
    try {
      setIsLoading(true);
      const res = await getUser();
      setuser(res.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);
  useEffect(() => {
    setFormData({
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
    });
  }, [user]);

  const update = async () => {
    try {
      setIsLoading(true);
      const res = await updateUser(formData);
      console.log(res.data);
      setUser(res.data);
      setIsLoading(false);
      getUserData();
      toast.success("Cập nhật thành công");
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Có lỗi xảy ra khi cập nhật thông tin người dùng.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSaveChanges = () => {
    update();
    console.log("Dữ liệu đã được cập nhật:", formData);
  };

  return (
    <div>
      <span className="checkout_left_span">Thông tin tài khoản</span>
      <div style={{ width: "50%" }}>
        <div className="checkout_left info">
          <div className="field__input-wrapper">
            <label htmlFor="lastName" className="field__label">
              Họ
            </label>
            <input
              name="lastName"
              id="lastName"
              type="text"
              className="field__input"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
          <div className="field__input-wrapper">
            <label htmlFor="firstName" className="field__label">
              Tên
            </label>
            <input
              name="firstName"
              id="firstName"
              type="text"
              className="field__input"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="field__input-wrapper">
            <label htmlFor="email" className="field__label">
              Email
            </label>
            <input
              name="email"
              id="email"
              type="email"
              className="field__input"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="cart1_button dmk">
          <div className="Cart1_item_rigth">
            <span onClick={handleSaveChanges}>Lưu thay đổi</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Info;
