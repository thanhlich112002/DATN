import React, { useEffect, useState } from "react";
import ProductTable from "./ProductTable";
import { getAllProducts } from "../../service/userService";
import AddProductForm from "./addProduct"; // Import form thêm sản phẩm

const TableProduct = () => {
  const [products, setProducts] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false); // State để theo dõi trạng thái mở/đóng của form

  const fetchProducts = async (page) => {
    try {
      const response = await getAllProducts(page);
      setProducts(response.data.data);
      setPageCount(response.data.totalPages);
      setCurrentPage(page);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách sản phẩm:", error);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]); // Thêm currentPage vào dependency array

  const handlePageChange = (selectedPage) => {
    fetchProducts(selectedPage);
  };

  const handleAddProductClick = () => {
    setIsOpen(true);
  };

  const handleAddProduct = async (newProduct) => {
    try {
      fetchProducts(currentPage);
      setIsOpen(false); // Đóng form sau khi thêm sản phẩm thành công
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm:", error);
    }
  };

  const handleEdit = (product) => {
    console.log("Chỉnh sửa sản phẩm", product);
  };

  const handleDelete = (product) => {
    console.log("Xóa sản phẩm", product);
  };

  return (
    <div>
      <div className="card-header">
        <span>Danh sách sản phẩm</span>
        <button onClick={handleAddProductClick}>Thêm sản phẩm</button>
      </div>
      {isOpen ? <AddProductForm setIsOpen={setIsOpen} /> : <></>}{" "}
      {/* Hiển thị form thêm sản phẩm khi isOpen là true */}
      <ProductTable products={products} />
      <div className="ReactPaginate">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Trước
        </button>
        <div>{currentPage}</div>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === pageCount}
        >
          Sau
        </button>
      </div>
    </div>
  );
};

export default TableProduct;
