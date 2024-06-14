import React, { useEffect, useState } from "react";
import ProductTable from "./OrderTable";
import { getAllOrders, getStatisticsOrders } from "../../service/userService";

const TableOrder = () => {
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [statisticsOrders, setStatisticsOrders] = useState("");
  const [endDate, setEndDate] = useState(
    new Date(Date.now() + 86400000).toISOString().split("T")[0]
  );
  const currentDate = new Date();
  currentDate.setMonth(currentDate.getMonth() - 1);
  const [startDate, setStartDate] = useState(
    currentDate.toISOString().split("T")[0]
  );

  const [status, setStatus] = useState("all");
  const fetchStatisticsOrders = async (page, status, start, end) => {
    try {
      const response = await getStatisticsOrders(start, end);
      setStatisticsOrders(response.data.data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách sản phẩm:", error);
    }
  };

  const fetchProducts = async (page, status, start, end) => {
    try {
      const response = await getAllOrders(page, status, start, end);
      setProducts(response.data.data);
      setPageCount(response.data.totalPages);
      setCurrentPage(page);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách sản phẩm:", error);
    }
  };
  useEffect(() => {
    fetchStatisticsOrders(startDate, endDate);
  }, [startDate, endDate]);

  useEffect(() => {
    fetchProducts(currentPage, status, startDate, endDate);
  }, [currentPage, status, startDate, endDate]);

  return (
    <div className="projects">
      <ProductTable
        products={products}
        fetchProducts={fetchProducts}
        currentPage={currentPage}
        pageCount={pageCount}
        setName={setName}
        status={status}
        setStatus={setStatus}
        endDate={endDate}
        setEndDate={setEndDate}
        startDate={startDate}
        setStartDate={setStartDate}
        statisticsOrders={statisticsOrders}
      />
    </div>
  );
};

export default TableOrder;
