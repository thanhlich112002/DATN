import React, { useEffect, useState } from "react";
import { useAuth } from "../../service/authContext";
import style from "./Account.css";
import { getOrdersByUserId, createPayment } from "../../service/API";
import { useLocation } from "react-router-dom";
import Form from "./formdetaidonhang";

function Order() {
  const location = useLocation();
  const [data, setData] = useState();
  const { user } = useAuth();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isopen, setIsOpen] = useState(false);

  useEffect(() => {
    const urlParams = window.location.search;
    if (urlParams) {
      createPayment(urlParams)
        .then(() => {
          localStorage.removeItem("cartItems");
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [location]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (user && user._id) {
        try {
          const req = await getOrdersByUserId(user._id);
          setData(req.data.data);
          console.log(req.data);
        } catch (error) {}
      }
    };
    fetchOrders();
  }, [user]);

  const handleDetail = (order) => {
    setIsOpen(true);
    setSelectedOrder(order);
  };

  return (
    <div className="order">
      {isopen ? <Form cart={selectedOrder} setIsOpen={setIsOpen} /> : <></>}

      <span className="checkout_left_span">Đơn hàng của bạn</span>
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>Đơn hàng</th>
              <th>Ngày</th>
              <th>Địa chỉ</th>
              <th>Giá trị đơn hàng</th>
              <th>TT đơng hàng</th>
              <th>Chi tiết</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((order) => (
              <tr key={order.id}>
                <td>{order._id}</td>
                <td>{order.dateOrdered}</td>
                <td>{order.contact?.address}</td>
                <td>{order.totalPrice}</td>
                <td>{order.status}</td>
                <td style={{ width: "80px" }}>
                  <button onClick={() => handleDetail(order)}>Chi tiết</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Order;
