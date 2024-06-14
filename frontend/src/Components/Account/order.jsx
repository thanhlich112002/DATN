import React, { useEffect, useState } from "react";
import { useAuth } from "../../service/authContext";
import style from "./Account.css";
import {
  getOrdersByUserId,
  createPayment,
  cancelOrder,
  ReturnOrder,
} from "../../service/API";
import { useLocation } from "react-router-dom";
import Form from "./formdetaidonhang";
import OrderBar from "./orderBar";
import DeleUser from "./ReturnOrder"; // Đã sửa lại đường dẫn đúng
import { toast } from "react-toastify";

function Order() {
  const location = useLocation();
  const { user } = useAuth();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenCan, setIsOpenCan] = useState(false); // Thêm state để quản lý modal hủy đơn hàng
  const [isOpenRut, setIsOpenRut] = useState(false); // Thêm state để quản lý modal hoàn trả đơn hàng
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [endDate, setEndDate] = useState(
    new Date(Date.now() + 86400000).toISOString().split("T")[0]
  );
  const pageNumbers = [];
  for (let i = 1; i <= pageCount; i++) {
    pageNumbers.push(i);
  }
  const currentDate = new Date();
  currentDate.setMonth(currentDate.getMonth() - 1);
  const [startDate, setStartDate] = useState(
    currentDate.toISOString().split("T")[0]
  );

  const [status, setStatus] = useState("all");

  const fetchProducts = async (page, status, start, end) => {
    try {
      const response = await getOrdersByUserId(
        user._id,
        page,
        status,
        start,
        end
      );
      console.log(response.data.data);
      setProducts(response.data.data);
      setPageCount(response.data.totalPages);
      setCurrentPage(response.data.currentPage);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách sản phẩm:", error);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage, status, startDate, endDate);
  }, [currentPage, status, startDate, endDate, user]);

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

  const handleDetail = (order) => {
    setIsOpen(true);
    setSelectedOrder(order);
  };

  const handleCancel = async (id) => {
    try {
      const response = await cancelOrder(id);
      toast.success(response.data.message);
      setIsOpenCan(false);
      fetchProducts(currentPage, status, startDate, endDate);
    } catch (error) {
      console.error("Lỗi khi hủy đơn hàng:", error);
      alert("Có lỗi xảy ra khi hủy đơn hàng. Vui lòng thử lại.");
    }
  };

  const handleReturn = async (id) => {
    try {
      const response = await ReturnOrder(id);
      toast.success(response.data.message);
      setIsOpenRut(false);
      fetchProducts(currentPage, status, startDate, endDate);
    } catch (error) {
      console.error("Lỗi khi hoàn đơn hàng:", error);
      alert("Có lỗi xảy ra khi hoàn đơn hàng. Vui lòng thử lại.");
    }
  };

  return (
    <div className="order">
      {isOpen ? <Form cart={selectedOrder} setIsOpen={setIsOpen} /> : null}

      <span className="checkout_left_span">Đơn hàng của bạn</span>
      <div className="table">
        <OrderBar
          status={status}
          setStatus={setStatus}
          endDate={endDate}
          setEndDate={setEndDate}
          startDate={startDate}
          setStartDate={setStartDate}
        />
        <table>
          <thead>
            <tr>
              <th>Đơn hàng</th>
              <th>Địa chỉ</th>
              <th>Giá trị đơn hàng</th>
              <th>TT đơn hàng</th>
              <th>Chi tiết</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody style={{ maxHeight: "200px" }}>
            {products?.map((order) => (
              <tr key={order.id} onClick={() => setSelectedOrder(order)}>
                <td>{order._id}</td>
                <td>{order.contact?.address}</td>
                <td>{order.totalPrice}</td>
                <td>{order.status}</td>
                <td>
                  <button
                    style={{
                      width: "80px",
                      padding: "5px",
                      borderRadius: "10px",
                    }}
                    onClick={() => handleDetail(order)}
                  >
                    Chi tiết
                  </button>
                </td>
                <td>
                  {order.status === "Pending" ||
                  order.status === "Confirmed" ? (
                    <button
                      style={{
                        width: "80px",
                        padding: "5px",
                        borderRadius: "10px",
                      }}
                      onClick={() => setIsOpenCan(true)}
                    >
                      Hủy
                    </button>
                  ) : null}
                  {order.status === "Shipped" ? (
                    <button
                      style={{
                        width: "80px",
                        padding: "5px",
                        borderRadius: "10px",
                      }}
                      onClick={() => setIsOpenRut(true)} // Mở modal hoàn trả đơn hàng
                    >
                      Hoàn đơn
                    </button>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div
          style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
        >
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() =>
                    fetchProducts(currentPage - 1, status, startDate, endDate)
                  }
                  aria-label="Previous"
                >
                  <span aria-hidden="true">&laquo;</span>
                </button>
              </li>
              {pageNumbers.map((number) => (
                <li
                  key={number}
                  className={`page-item ${
                    currentPage === number ? "active" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() =>
                      fetchProducts(number, status, startDate, endDate)
                    }
                  >
                    {number}
                  </button>
                </li>
              ))}
              <li
                className={`page-item ${
                  currentPage === pageCount ? "disabled" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() =>
                    fetchProducts(currentPage + 1, status, startDate, endDate)
                  }
                  aria-label="Next"
                >
                  <span aria-hidden="true">&raquo;</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
        {/* Modal hủy đơn hàng */}
        {isOpenCan ? (
          <DeleUser
            title="Bạn chắc chắn muốn hủy đơn"
            onCancel={() => setIsOpenCan(false)}
            handleConfirmDelete={handleCancel} // Đổi handleCancel thành handleConfirmDelete
            id={selectedOrder?._id} // Truyền id của đơn hàng cần hủy
          />
        ) : null}
        {/* Modal hoàn trả đơn hàng */}
        {isOpenRut ? (
          <DeleUser
            title="Bạn chắc chắn muốn hoàn trả đơn"
            onCancel={() => setIsOpenRut(false)}
            handleConfirmDelete={handleReturn} // Đổi handleCancel thành handleConfirmDelete
            id={selectedOrder} // Truyền id của đơn hàng cần hoàn trả
          />
        ) : null}
      </div>
    </div>
  );
}

export default Order;
