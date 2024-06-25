import React, { useState, useEffect } from "react";
import { useUser } from "../../service/userContext";
import AddAddress from "../Account/form";

function UserInfo({
  user,
  address,
  setAddress,
  openAddress,
  setOpenAddress,
  getUserData,
}) {
  return (
    <div className="col">
      <div>
        <div className="checkout_left_top">
          <span>Thông tin mua hàng</span>
        </div>
        <div className="checkout_left">
          <div className="field__input-wrapper">
            <label htmlFor="name" className="field__label">
              Họ và Tên
            </label>
            <input
              name="name"
              id="name"
              type="text"
              className="field__input"
              value={user?.lastName + " " + user?.firstName}
            />
          </div>
          <div className="field__input-wrapper">
            <label htmlFor="email" className="field__label">
              Email (tùy chọn)
            </label>
            <input
              name="email"
              id="email"
              type="email"
              className="field__input"
              value={user?.email}
            />
          </div>
        </div>
        <div className="checkout_left_top">
          <span>Địa chỉ mặc định</span>
          <button className="addbut" onClick={() => setOpenAddress(true)}>
            Thêm địa chỉ
          </button>
        </div>
        <div className="checkout_left">
          <div className="field__input-wrapper">
            <label htmlFor="province" className="field__label">
              Chọn địa chỉ
            </label>
            <select
              name="phone_number"
              id="phone_number"
              className="field__input"
              value={address?._id || ""}
              onChange={(e) =>
                setAddress(
                  user.contact.find((contact) => contact._id === e.target.value)
                )
              }
            >
              {user?.contact?.map((contact) => (
                <option key={contact._id} value={contact._id}>
                  {contact.address}
                </option>
              ))}
            </select>
          </div>
          <div className="field__input-wrapper">
            <label htmlFor="phone" className="field__label">
              Số điện thoại
            </label>
            <input
              name="address"
              id="address"
              type="tel"
              className="field__input"
              value={address?.phoneNumber}
            />
          </div>
        </div>
      </div>
      {openAddress && (
        <AddAddress setIsOpen={setOpenAddress} getUserData={getUserData} />
      )}
    </div>
  );
}

export default UserInfo;
