import React, { useEffect, useState } from "react";
import ProductTable from "./ProductTable";
import { getAllOrders, upStatus } from "../../service/userService";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const TableProduct = () => {
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const fetchProducts = async (page) => {
    try {
      const response = await getAllOrders(page);
      setProducts(response.data.data);
      setPageCount(response.data.totalPages);
      setCurrentPage(page);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách sản phẩm:", error);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);
  const handlePageChange = (selectedPage) => {
    fetchProducts(selectedPage);
  };
  const navigate = useNavigate();
  const handleAddProductClick = () => {
    navigate(`/admin/tableProduct/add`);
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
          <div
            style={{
              display: "flex",
              width: "100px",
              height: "100px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FontAwesomeIcon icon={faBookmark} fontSize={70} color="#C0C0C0" />
          </div>
          <span>Quản lý đơn hàng</span>
        </div>
      </div>
      <div className="ReactPaginate">
        <div
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </div>
        <div>{currentPage}</div>
        <div
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === pageCount}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
      </div>
      <ProductTable
        products={products}
        fetchProducts={fetchProducts}
        currentPage={currentPage}
      />
    </div>
  );
};

export default TableProduct;
