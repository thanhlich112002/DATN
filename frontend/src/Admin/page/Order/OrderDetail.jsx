import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getOrdersByOrderId, upStatus } from "../../service/userService";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CartItem from "./CartItem";
import "./style.css";

function OrderDetail({ setIsLoading }) {
  const { id } = useParams();
  const [cart, setCart] = useState(null); // Initialize cart state
  const [selectedStatus, setSelectedStatus] = useState("");
  const [notification, setNotification] = useState("");
  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const req = await upStatus(
        {
          notification: notification,
          status: selectedStatus,
        },
        cart._id
      );
      setIsLoading(false);
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCart(id);
    console.log(id);
  }, [id]);

  const getCart = async (id) => {
    try {
      setIsLoading(true);
      const response = await getOrdersByOrderId(id);
      setCart(response.data.data);
      setSelectedStatus(response.data.data.status);
      setNotification(response.data.data.notification);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching order:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="projects BrP5">
      <div className="_card">
        <div className="card-header">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              borderRadius: "5px",
              marginBottom: "20px",
            }}
          >
            <span>Chi tiết đơn hàng</span>
          </div>
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
            <div className="checkout_left_top">
              <span>Thông tin đơn hàng </span>
            </div>
            <div
              style={{
                display: "flex",
                gap: "10px",
              }}
            >
              <strong>ID:</strong>
              <span>{cart?._id}</span>
            </div>
            <div
              style={{
                display: "flex",
                gap: "10px",
              }}
            >
              <strong>Ngày đặt hàng:</strong>
              <span>{cart?.dateOrdered}</span>
            </div>
            <div
              style={{
                display: "flex",
                gap: "10px",
              }}
            >
              <strong>Địa chỉ:</strong>
              <span>{cart?.contact?.address}</span>
            </div>
            <div
              style={{
                display: "flex",
                gap: "10px",
              }}
            >
              <strong>Giá trị đơn hàng:</strong>
              <span>{cart?.totalPrice}</span>
            </div>
            <div
              style={{
                display: "flex",
                gap: "10px",
              }}
            >
              <strong>Phí vận chuyển:</strong>
              <span>{cart?.shipCost}</span>
            </div>
            <div
              style={{
                display: "flex",
                gap: "10px",
              }}
            >
              <strong>Tình trạng:</strong>
              <span>{cart?.status}</span>
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
                <option value="Pending">Chờ xử lý</option>
                <option value="Confirmed">Đã xác nhận</option>
                <option value="Shipped">Vận chuyển</option>
                <option value="Finished">Hoàn thành</option>
                <option value="Cancelled">Hủy bỏ</option>
              </select>
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
                  height: "60px",
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
            <div className="checkout_left_top">
              <span>Thông tin người dùng</span>
            </div>
            <div
              style={{
                display: "flex",
                gap: "10px",
              }}
            >
              <strong>ID:</strong>
              <span>{cart?.user._id}</span>
            </div>
            <div
              style={{
                display: "flex",
                gap: "10px",
              }}
            >
              <strong>Họ và tên:</strong>
              <span>{cart?.user.lastName + " " + cart?.user.firstName}</span>
            </div>
            <div
              style={{
                display: "flex",
                gap: "10px",
              }}
            >
              <strong>Email:</strong>
              <span>{cart?.user.email}</span>
            </div>
          </div>
        </div>

        <div style={{ maxHeight: "270px", overflowY: "auto" }}>
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
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderDetail;
