import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { addContact } from "../../../service/API";
import CartItem from "./CartItem";

function AddAddress({ setIsOpen, cart }) {
  return (
    <div className="full">
      <div className="Form_Add" style={{ width: "80%" }}>
        <div className="X" onClick={() => setIsOpen(false)}>
          <FontAwesomeIcon icon={faTimes} />
        </div>
        <div className="checkout_left_top">
          <span>Đơn hàng</span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              flex: "5",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "10px",
              }}
            >
              <strong>ID:</strong>
              <span>{cart._id}</span>
            </div>
            <div
              style={{
                display: "flex",
                gap: "10px",
              }}
            >
              <strong>Ngày đặt hàng:</strong>
              <span>{cart.dateOrdered}</span>
            </div>
            <div
              style={{
                display: "flex",
                gap: "10px",
              }}
            >
              <strong>Địa chỉ:</strong>
              <span>{cart.contact?.address}</span>
            </div>
            <div
              style={{
                display: "flex",
                gap: "10px",
              }}
            >
              <strong>Thông báo:</strong>
              <textarea
                style={{
                  padding: "10px 10px",
                  width: "70%",
                  fontSize: "14px",
                  color: "black",
                  fontWeight: "350",
                  outline: "none",
                }}
                value={cart.notification}
              />
            </div>
          </div>
          <div
            style={{
              flex: "5",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "10px",
              }}
            >
              <strong>Giá trị đơn hàng:</strong>
              <span>{cart.totalPrice}</span>
            </div>
            <div
              style={{
                display: "flex",
                gap: "10px",
              }}
            >
              <strong>Phí vận chuyển:</strong>
              <span>{cart.shipCost}</span>
            </div>
            <div
              style={{
                display: "flex",
                gap: "10px",
              }}
            >
              <strong>Tình trạng:</strong>
              <span>{cart.status}</span>
            </div>
          </div>
        </div>

        <div className="Cart_left">
          {cart?.cart?.map((product, index) => (
            <CartItem product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default AddAddress;
