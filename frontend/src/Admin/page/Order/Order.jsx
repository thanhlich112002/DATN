import React, { useEffect, useState } from "react";
import ProductTable from "./OrderTable";
import { getAllOrders } from "../../service/userService";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";

const TableOrder = () => {
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
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
    fetchProducts(currentPage, status);
  }, [currentPage, status]);

  useEffect(() => {
    fetchProducts(currentPage, status, name);
  }, [currentPage, name, status]);

  return (
    <div className="projects">
      {/* <div className="card-header">
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
      </div> */}
      <ProductTable
        products={products}
        fetchProducts={fetchProducts}
        currentPage={currentPage}
        pageCount={pageCount}
        setName={setName}
      />
    </div>
  );
};

export default TableOrder;
