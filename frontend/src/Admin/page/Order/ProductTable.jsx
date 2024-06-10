import React, { useEffect, useState } from "react";
import { useTable } from "react-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import "./style.css"; // Import the CSS file with the dot styles
import { useNavigate } from "react-router-dom";
import { getAllOrders, upStatus } from "../../service/userService";
import Form from "./formdetaidonhang";

const ProductTable = ({ products, fetchProducts, currentPage }) => {
  const [deletingProduct, setDeletingProduct] = useState(null);
  const navigate = useNavigate();
  const data = React.useMemo(() => products, [products]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isopen, setIsOpen] = useState(false);
  const handleDetail = (order) => {
    setIsOpen(true);
    setSelectedOrder(order);
  };

  const columns = React.useMemo(
    () => [
      { Header: "Đơn hàng", accessor: "_id" },
      { Header: "Người đặt hàng", accessor: "user" },
      { Header: "Ngày", accessor: "dateOrdered" },
      { Header: "Địa chỉ", accessor: "contact.address" },
      { Header: "Giá trị đơn hàng", accessor: "totalPrice" },
      {
        Header: "TT đơn hàng",
        accessor: "status",

        Cell: ({ value }) => (
          <center>
            <span
              style={{
                padding: "5px 10px",
                color: "#000000",
                borderRadius: "10px",
              }}
              className={`status ${value}`}
            >
              {value}
            </span>
          </center>
        ),
      },
      {
        Header: "Chi tiết",
        accessor: "",
        Cell: ({ row }) => (
          <button
            style={{ width: "100px", padding: "5px", borderRadius: "5px" }}
            onClick={() => handleDetail(row.original)}
          >
            Chi tiết
          </button>
        ),
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  useEffect(() => {
    fetchProducts(currentPage);
  }, [deletingProduct, isopen]);

  return (
    <div>
      <div className="projects">
        {isopen && <Form cart={selectedOrder} setIsOpen={setIsOpen} />}
        <div className="_card">
          <div className="_card-body">
            <table {...getTableProps()} className="styled-table">
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
  );
};

export default ProductTable;
