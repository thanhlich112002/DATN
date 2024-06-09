import React, { useEffect, useState } from "react";
import ProductTable from "./ProductTable";
import { getAllOrders, upStatus } from "../../service/userService";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
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
    <div>
      <div className="card-header">
        <span>Danh sách đơn hàng</span>
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
