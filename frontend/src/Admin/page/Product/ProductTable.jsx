import React, { useEffect, useState } from "react";
import { useTable } from "react-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import "./style.css";
import DeleteProductForm from "./DeleteProductForm"; // Đảm bảo đường dẫn đúng
import { useNavigate } from "react-router-dom";
import TopTable from "../component/TopTable/TopTable"; // Đảm bảo đường dẫn đúng

const ProductTable = ({
  products,
  fetchProducts,
  currentPage,
  pageCount,
  setName,
}) => {
  const [deletingProduct, setDeletingProduct] = useState(null);
  const navigate = useNavigate();
  const data = React.useMemo(() => products, [products]);
  const columns = React.useMemo(
    () => [
      { Header: "Tên", accessor: "name" },
      { Header: "Thương Hiệu", accessor: "Brand.name" },
      { Header: "Danh Mục", accessor: "Category.name" },
      {
        Header: "Hình Ảnh",
        accessor: "images",
        Cell: ({ cell: { value } }) => (
          <img src={value[0]} alt="product" width="50" />
        ),
      },
      { Header: "Giá", accessor: "price" },
      {
        Header: "Có Sẵn",
        accessor: "isAvailable",
        Cell: ({ cell: { value } }) => (
          <span className={`dot ${value ? "green-dot" : "red-dot"}`}></span>
        ),
      },
      {
        Header: "Hành Động",
        accessor: "actions",
        Cell: ({ row }) => (
          <div className="btn_tab">
            <button onClick={() => Up(row.original._id)} className="btn-edit">
              <FontAwesomeIcon icon={faEdit} />
            </button>
            <button
              onClick={() => setDeletingProduct(row.original)}
              className="btn-delete"
            >
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });
  const Up = (id) => {
    navigate(`/admin/product/${id}`);
  };
  useEffect(() => {
    fetchProducts(currentPage);
  }, [deletingProduct]);

  const handleSearch = (name) => {
    setName(name);
  };

  return (
    <div>
      <div className="projects">
        <div className="_card">
          <div className="_card-body">
            {deletingProduct && (
              <DeleteProductForm
                setIsOpen={() => setDeletingProduct(null)}
                item={deletingProduct}
              />
            )}
            <div className="styled-table">
              <TopTable
                handleSearch={handleSearch}
                handlePageChange={fetchProducts}
                currentPage={currentPage}
                pageCount={pageCount}
              />
              <table {...getTableProps()}>
                <thead>
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th {...column.getHeaderProps()}>
                          {column.render("Header")}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {rows.map((row) => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map((cell) => (
                          <td
                            {...cell.getCellProps()}
                            className={
                              cell.column.id === "actions" ||
                              cell.column.id === "isAvailable"
                                ? "center-align"
                                : ""
                            }
                          >
                            {cell.render("Cell")}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductTable;
