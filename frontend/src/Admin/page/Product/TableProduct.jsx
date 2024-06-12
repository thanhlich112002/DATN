import React, { useEffect, useState } from "react";
import ProductTable from "./ProductTable";
import { getAllProducts, searchProducts } from "../../service/userService";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faUsers } from "@fortawesome/free-solid-svg-icons";
import Card from "../Dashboard/card";

const TableProduct = () => {
  const [products, setProducts] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const fetchProducts = async (page) => {
    try {
      const response = await getAllProducts(page);
      setProducts(response.data.data);
      setPageCount(response.data.totalPages);
      setCurrentPage(response.data.currentPage);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách sản phẩm:", error);
    }
  };

  const fetchSProducts = async (searchTerm, page) => {
    try {
      const response = await searchProducts(searchTerm, page);
      setProducts(response.data.data);
      setPageCount(response.data.totalPages);
      setCurrentPage(response.data.currentPage);
    } catch (error) {
      console.error("Lỗi khi tìm kiếm sản phẩm:", error);
    }
  };

  useEffect(() => {
    if (name) {
      fetchSProducts(name, currentPage);
    } else {
      fetchProducts(currentPage);
    }
  }, [currentPage, name]);

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
          <span>Quản lý sản phẩm</span>
        </div>
        <button className="background_cl" onClick={handleAddProductClick}>
          Thêm sản phẩm
        </button>
      </div>
      <div className="dashboard_cards">
        <Card value={5} title={"Khách hàng"} icon={faUsers} cln={"bcl1"} />
        <Card value={5} title={"Khách hàng"} icon={faUsers} cln={"bcl2"} />
        <Card value={5} title={"Khách hàng"} icon={faUsers} cln={"bcl3"} />
        <Card value={5} title={"Khách hàng"} icon={faUsers} cln={"bcl4"} />
      </div>
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

export default TableProduct;
