import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faBox,
  faDollarSign,
  faReceipt,
} from "@fortawesome/free-solid-svg-icons";
import "./Dashboard.css";
import {
  quantity,
  getAllOrders,
  getStatistics,
} from "../../service/userService";
import { useNavigate, useParams } from "react-router-dom";

function Dashboard() {
  const [data, setData] = useState({ user: 0, product: 0, order: 0 });
  const [products, setProducts] = useState([]);
  const [revenue, setRevenue] = useState(0);
  function formatCurrency(price) {
    return price.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  }
  const navigate = useNavigate();
  const handleBackToCategoryList = () => {
    navigate("/admin/manageorder");
  };
  const fetchProducts = async (page) => {
    try {
      const response = await getAllOrders(page);
      setProducts(response.data.data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách sản phẩm:", error);
    }
  };

  const fetchRevenue = async () => {
    try {
      const req = await getStatistics();
      setRevenue(req.data.totalAmount);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchData = async () => {
    try {
      const req = await quantity();
      setData(req.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchRevenue();
    fetchProducts();
    fetchData();
  }, []);

  return (
    <div>
      <div className="card-header">
        <span>Trang Admin</span>
      </div>
      <div className="dashboard_top">
        <div className="dashboard_cards">
          <div className="dashboard_card-single">
            <div>
              <div>{data.user}</div>
              <span>Khách hàng</span>
            </div>
            <div>
              <FontAwesomeIcon icon={faUsers} className="icon" />
            </div>
          </div>
          <div className="dashboard_card-single">
            <div>
              <div>{data.product}</div>
              <span>Sản phẩm</span>
            </div>
            <div>
              <FontAwesomeIcon icon={faBox} className="icon" />
            </div>
          </div>
          <div className="dashboard_card-single">
            <div>
              <div>{formatCurrency(revenue)}</div>
              <span>Doanh thu</span>
            </div>
            <div>
              <FontAwesomeIcon icon={faDollarSign} className="icon" />
            </div>
          </div>
          <div className="dashboard_card-single">
            <div>
              <div>{data.order}</div>
              <span>Đơn hàng</span>
            </div>
            <div>
              <FontAwesomeIcon icon={faReceipt} className="icon" />
            </div>
          </div>
        </div>
        <div className="recent-grid">
          <div className="projects">
            <div className="_card">
              <div className="card-header">
                <span>Đơn hàng</span>
                <button onClick={() => handleBackToCategoryList()}>
                  Xem thêm
                </button>
              </div>
              <div className="card-body">
                <table>
                  <thead>
                    <tr>
                      <td>ID đơn hàng</td>
                      <td>ID Khách hàng</td>
                      <td>Giá</td>
                      <td>Trạng thái</td>
                    </tr>
                  </thead>
                  <tbody>
                    {products &&
                      products.map((product, index) => (
                        <tr key={index}>
                          <td>{product._id}</td>
                          <td>{product.user}</td>
                          <td>{formatCurrency(product.totalPrice)}</td>
                          <td>
                            <span className={`status ${product.status}`}></span>
                            {product.status}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="customers">
            <div className="card">
              <div className="card-header">
                <span>Người dùng mới</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
