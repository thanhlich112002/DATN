import React, { useEffect, useState } from "react";
import ProductTable from "./ProductTable";
import {
  getAllProducts,
  searchProducts,
  getStatisticsProduct,
} from "../../service/userService";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoxes,
  faTags,
  faBan,
  faExclamationCircle,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import Card from "../Dashboard/card";

const TableProduct = ({ setIsLoading }) => {
  const [products, setProducts] = useState([]);
  const [statistics, setStatistics] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [status, setStatus] = useState(true);
  const [status1, setStatus1] = useState(false);

  const fetchProducts = async (page, status, status1) => {
    try {
      setIsLoading(true);
      const response = await getAllProducts(page, status, status1);
      setProducts(response.data.data);
      setPageCount(response.data.totalPages);
      setCurrentPage(response.data.currentPage);
      setIsLoading(false);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách sản phẩm:", error);
      setIsLoading(false);
    }
  };
  const fetchStatistics = async () => {
    try {
      setIsLoading(true);
      const response = await getStatisticsProduct();
      setStatistics(response.data.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách sản phẩm:", error);
      setIsLoading(false);
    }
  };

  const fetchSProducts = async (searchTerm, page, status, status1) => {
    try {
      setIsLoading(true);
      const response = await searchProducts(searchTerm, page, status, status1);
      setProducts(response.data.data);
      setPageCount(response.data.totalPages);
      setCurrentPage(response.data.currentPage);
      setIsLoading(false);
    } catch (error) {
      console.error("Lỗi khi tìm kiếm sản phẩm:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (name) {
      fetchSProducts(name, currentPage, status, status1);
    } else {
      fetchProducts(currentPage, status, status1);
    }
  }, [currentPage, name, status, status1]);
  useEffect(() => {
    fetchStatistics();
  }, []);

  const handleAddProductClick = () => {
    navigate(`/admin/product/add`);
  };

  return (
    <div className="projects">
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
          <span>Quản lý sản phẩm</span>
        </div>
        <button className="addbut" onClick={handleAddProductClick}>
          <div>Thêm sản phẩm </div>
          <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
        </button>
      </div>
      <div className="dashboard_cards">
        <Card
          value={statistics?.totalQuantity}
          title={"Tổng lượng hàng"}
          icon={faBoxes} // Biểu tượng cho Tổng lượng hàng
          cln={"bcl1"}
        />
        <Card
          value={statistics?.countavailable}
          title={"Số sản phẩm đang bán"}
          icon={faTags}
          cln={"bcl2"}
        />
        <Card
          value={statistics.countUnavailable}
          title={"Ngừng kinh doanh"}
          icon={faBan}
          cln={"bcl3"}
        />
        <Card
          value={statistics.countOutofOrder}
          title={"Đã đang hết hàng"}
          icon={faExclamationCircle}
          cln={"bcl4"}
        />
      </div>
      <ProductTable
        products={products}
        fetchProducts={fetchProducts}
        currentPage={currentPage}
        pageCount={pageCount}
        setName={setName}
        status={status}
        setStatus={setStatus}
        status1={status1}
        setStatus1={setStatus1}
      />
    </div>
  );
};

export default TableProduct;
