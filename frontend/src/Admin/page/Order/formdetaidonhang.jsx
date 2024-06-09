import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import CartItem from "./CartItem";
import { upStatus } from "../../service/userService";

function AddAddress({ setIsOpen, cart }) {
  const [selectedStatus, setSelectedStatus] = useState(cart.status);
  const [notification, setNotification] = useState(cart.notification);
  const handleSubmit = async () => {
    try {
      const req = await upStatus(
        {
          notification: notification,
          status: selectedStatus,
        },
        cart._id
      );
      setIsOpen(false);
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái:", error);
    }
  };

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
                  outline: "none", // Loại bỏ viền khi được focus
                }}
                value={notification}
                onChange={(e) => setNotification(e.target.value)}
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
            <div
              style={{
                display: "flex",
                gap: "10px",
              }}
            >
              <strong>Cập nhật trạng thái:</strong>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                style={{
                  padding: "2px 5px",
                }}
              >
                <option value="Pending">Đang chờ</option>
                <option value="Confirmed">Đã xác nhận</option>
                <option value="Shipped">Đã giao hàng</option>
                <option value="Finished">Hoàn thành</option>
                <option value="Cancelled">Hủy bỏ</option>
              </select>
            </div>
          </div>
        </div>

        {/* Nút để gửi thông báo */}
        <div className="Cart_left">
          {cart?.cart?.map((product, index) => (
            <CartItem product={product} key={index} />
          ))}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <button style={{ padding: "5px 10px" }} onClick={handleSubmit}>
            Cập nhật
          </button>{" "}
        </div>
      </div>
    </div>
  );
}

export default AddAddress;
