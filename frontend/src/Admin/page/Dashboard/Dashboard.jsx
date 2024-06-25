import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faBookmark,
  faBox,
  faShoppingCart,
  faMoneyBill,
} from "@fortawesome/free-solid-svg-icons";
import "./Dashboard.css";
import { quantity, getStatistics } from "../../service/userService";
import {
  getOrderRevenueByCategory,
  getOrderCount,
  getTopSale,
  getOrderRevenueByBrand,
} from "../../service/ApiStic";
import { useNavigate } from "react-router-dom";
import Cart from "./card";
import Car from "./Bar";
import Pie from "./Pie";
import Topsale from "./topSale";
import TopBrand from "./topBrand";

function Dashboard() {
  const [data, setData] = useState({ user: 0, product: 0, order: 0 });
  const [products, setProducts] = useState([]);
  const [revenue, setRevenue] = useState(0);

  // State cho từng thành phần với thời gian riêng
  const [orderCountTime, setOrderCountTime] = useState("month");
  const [orderRevenueByCategoryTime, setOrderRevenueByCategoryTime] =
    useState("month");
  const [orderRevenueByBrandTime, setOrderRevenueByBrandTime] =
    useState("month");
  const [topSaleTime, setTopSaleTime] = useState("month");

  const [OrderCount, setOrderCount] = useState([]);
  const [orderRevenueByCategory, setOrderCountByCategory] = useState([]);
  const [orderRevenueByBrand, setsetOrderRevenueByBrand] = useState([]);

  const navigate = useNavigate();

  const fetchOrderCount = async (time) => {
    try {
      const response = await getOrderCount(time);
      setOrderCount(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách sản phẩm:", error);
    }
  };

  const fetchOrderRevenueByCategory = async (time) => {
    try {
      const response = await getOrderRevenueByCategory(time);
      setOrderCountByCategory(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách sản phẩm:", error);
    }
  };

  const fetchOrderRevenueByBrand = async (time) => {
    try {
      const response = await getOrderRevenueByBrand(time);
      setsetOrderRevenueByBrand(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách sản phẩm:", error);
    }
  };

  const fetchProducts = async (time) => {
    try {
      const response = await getTopSale(time);
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
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  };

  const fetchData = async () => {
    try {
      const req = await quantity("day");
      setData(req.data.data);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  };

  useEffect(() => {
    fetchRevenue();
    fetchProducts(topSaleTime);
    fetchData();
    fetchOrderCount(orderCountTime);
    fetchOrderRevenueByCategory(orderRevenueByCategoryTime);
    fetchOrderRevenueByBrand(orderRevenueByBrandTime);
  }, []);
  useEffect(() => {
    fetchProducts(topSaleTime);
  }, [topSaleTime]);
  useEffect(() => {
    fetchOrderCount(orderCountTime);
  }, [orderCountTime]);
  useEffect(() => {
    fetchOrderRevenueByCategory(orderRevenueByCategoryTime);
  }, [orderRevenueByCategoryTime]);
  useEffect(() => {
    fetchOrderRevenueByBrand(orderRevenueByBrandTime);
  }, [orderRevenueByBrandTime]);

  return (
    <div className="projects">
      <div className="card-header">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            borderRadius: "5px",
            marginBottom: "20px",
            marginLeft: "20px",
          }}
        >
          <span>Thông kê</span>
        </div>
      </div>
      <div className="dashboard_top">
        <div className="dashboard_cards">
          <Cart
            value={data.user}
            title={"Khách hàng"}
            icon={faUsers}
            cln={"bcl1"}
          />
          <Cart
            value={data.product}
            title={"Sản phẩm"}
            icon={faBox}
            cln={"bcl2"}
          />
          <Cart
            value={data.order}
            title={"Đơn hàng trong ngày"}
            icon={faShoppingCart}
            cln={"bcl3"}
          />
          <Cart
            value={revenue}
            title={"Doanh thu trong ngày"}
            icon={faMoneyBill}
            cln={"bcl4"}
          />
        </div>
        <div
          style={{
            display: "flex",
            gap: "30px",
            justifyContent: "space-between",
          }}
          className=""
        >
          <div style={{ width: "60%" }} className="layout BrP5">
            <div className="header_table">
              <div style={{ fontSize: "30px" }} className="header_table">
                Doanh thu
              </div>
              <div className="title_btn">
                <ul>
                  <li
                    onClick={() => setOrderCountTime("year")}
                    className={orderCountTime === "year" ? "ATV" : ""}
                  >
                    Năm
                  </li>
                  <li
                    onClick={() => setOrderCountTime("month")}
                    className={orderCountTime === "month" ? "ATV" : ""}
                  >
                    Tháng
                  </li>
                  <li
                    onClick={() => setOrderCountTime("week")}
                    className={orderCountTime === "week" ? "ATV" : ""}
                  >
                    Tuần
                  </li>
                  <li
                    onClick={() => setOrderCountTime("day")}
                    className={orderCountTime === "day" ? "ATV" : ""}
                  >
                    Hôm nay
                  </li>
                </ul>
              </div>
            </div>
            <Car data={OrderCount} />
          </div>
          <div style={{ width: "40%" }} className="layout BrP5">
            <div className="header_table">
              <div style={{ fontSize: "30px" }} className="header_table">
                Thống kê theo danh mục
              </div>
              <div className="title_btn">
                <ul>
                  <li
                    onClick={() => setOrderRevenueByCategoryTime("year")}
                    className={
                      orderRevenueByCategoryTime === "year" ? "ATV" : ""
                    }
                  >
                    Năm
                  </li>
                  <li
                    onClick={() => setOrderRevenueByCategoryTime("month")}
                    className={
                      orderRevenueByCategoryTime === "month" ? "ATV" : ""
                    }
                  >
                    Tháng
                  </li>
                  <li
                    onClick={() => setOrderRevenueByCategoryTime("week")}
                    className={
                      orderRevenueByCategoryTime === "week" ? "ATV" : ""
                    }
                  >
                    Tuần
                  </li>
                  <li
                    onClick={() => setOrderRevenueByCategoryTime("day")}
                    className={
                      orderRevenueByCategoryTime === "day" ? "ATV" : ""
                    }
                  >
                    Ngày
                  </li>
                </ul>
              </div>
            </div>
            <div style={{ margin: "20px" }}>
              <Pie data={orderRevenueByCategory} />
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: "30px" }}>
          <div style={{ width: "60%" }} className="layout BrP5">
            <div className="header_table">
              <div style={{ fontSize: "30px" }} className="header_table">
                Sản phẩm bán chạy nhất
              </div>
              <div className="title_btn">
                <ul>
                  <li
                    onClick={() => setTopSaleTime("year")}
                    className={topSaleTime === "year" ? "ATV" : ""}
                  >
                    Năm
                  </li>
                  <li
                    onClick={() => setTopSaleTime("month")}
                    className={topSaleTime === "month" ? "ATV" : ""}
                  >
                    Tháng
                  </li>
                  <li
                    onClick={() => setTopSaleTime("week")}
                    className={topSaleTime === "week" ? "ATV" : ""}
                  >
                    Tuần
                  </li>
                  <li
                    onClick={() => setTopSaleTime("day")}
                    className={topSaleTime === "day" ? "ATV" : ""}
                  >
                    Ngày
                  </li>
                </ul>
              </div>
            </div>
            <Topsale products={products} />
          </div>
          <div style={{ width: "40%" }} className="layout BrP5">
            <div className="header_table">
              <div style={{ fontSize: "30px" }} className="header_table">
                Thống kê theo thương hiệu
              </div>
              <div className="title_btn">
                <ul>
                  <li
                    onClick={() => setOrderRevenueByBrandTime("year")}
                    className={orderRevenueByBrandTime === "year" ? "ATV" : ""}
                  >
                    Năm
                  </li>
                  <li
                    onClick={() => setOrderRevenueByBrandTime("month")}
                    className={orderRevenueByBrandTime === "month" ? "ATV" : ""}
                  >
                    Tháng
                  </li>
                  <li
                    onClick={() => setOrderRevenueByBrandTime("week")}
                    className={orderRevenueByBrandTime === "week" ? "ATV" : ""}
                  >
                    Tuần
                  </li>
                  <li
                    onClick={() => setOrderRevenueByBrandTime("day")}
                    className={orderRevenueByBrandTime === "day" ? "ATV" : ""}
                  >
                    Ngày
                  </li>
                </ul>
              </div>
            </div>
            <TopBrand data={orderRevenueByBrand} />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
