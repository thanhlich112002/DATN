import React from "react";
import { useAuth } from "../../service/authContext";
import style from "./Account.css";

function Info() {
  const { user } = useAuth();
  return (
    <div>
      <span className="checkout_left_span">Thông tin tài khoản</span>
      <div style={{ width: "50%" }}>
        <div className="checkout_left info">
          <div class="field__input-wrapper">
            <label for="name" class="field__label">
              Họ
            </label>
            <input
              name="name"
              id="name"
              type="text"
              class="field__input"
              data-bind="name"
              value={user?.lastName}
            />
          </div>
          <div class="field__input-wrapper">
            <label for="name" class="field__label">
              Tên
            </label>
            <input
              name="name"
              id="name"
              type="text"
              class="field__input"
              data-bind="name"
              value={user?.firstName}
            />
          </div>
          <div class="field__input-wrapper">
            <label for="email" class="field__label">
              Email (tùy chọn)
            </label>
            <input
              name="email"
              id="email"
              type="email"
              class="field__input"
              data-bind="email"
              value={user?.email}
            />
          </div>
        </div>
        <div className="cart1_button dmk">
          <div className="Cart1_item_rigth">
            <span>Lưu thay đổi</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Info;
