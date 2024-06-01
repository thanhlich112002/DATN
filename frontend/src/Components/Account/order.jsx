import React, { useEffect, useState } from "react";
import { useAuth } from "../../service/authContext";
import style from "./Account.css";
import { getOrdersByUserId } from "../../service/API";

function Order() {
  
  const [data, setData] = useState();
  const { user } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      if (user && user._id) {
        const req = await getOrdersByUserId(user._id);
        setData(req.data.data);
        console.log(req.data);
      }
    };

    fetchOrders();
  }, [user]);

  return (
    <div className="order">
      <span className="checkout_left_span">Đơn hàng của bạn</span>
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>Đơn hàng</th>
              <th>Ngày</th>
              <th>Địa chỉ</th>
              <th>Giá trị đơn hàng</th>
              <th>TT thanh toán</th>
              <th>TT vận chuyển</th>
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
                <td>{order.cart?.lengh}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Order;
