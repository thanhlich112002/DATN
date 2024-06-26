import React, { useEffect, useState } from "react";
import { useTable } from "react-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faEdit,
  faShoppingCart,
  faTrashAlt,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
import "./style.css"; // Import file CSS chứa các kiểu dáng
import { useNavigate } from "react-router-dom";
import Form from "./formdetaidonhang";
import TopTable from "../component/TopTable/TopTable";
import OrderBar from "../component/TopTable/orderBar";
import Card from "../Dashboard/card";
import { faBan } from "@fortawesome/free-solid-svg-icons";
const moment = require("moment-timezone");

const ProductTable = ({
  products,
  fetchProducts,
  currentPage,
  pageCount,
  setName,
  status,
  setStatus,
  endDate,
  setEndDate,
  startDate,
  setStartDate,
  statisticsOrders,
  setIsLoading,
}) => {
  // Hàm chuyển đổi ngày
  const convertDate = (utcDate) => {
    const localDate = moment.utc(utcDate);
    return localDate.format("HH:mm DD/MM/YYYY");
  };

  const data = React.useMemo(() => products, [products]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isopen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const handleDetail1 = (id) => {
    navigate(`/admin/order/${id}`);
  };

  const handleDetail = (order) => {
    setIsOpen(true);
    setSelectedOrder(order);
  };
  const Translate = (value) => {
    if (value === "Pending") return "Đang chờ";
    if (value === "Confirmed") return "Đã xác nhận";
    if (value === "Shipped") return "Đang vận chuyển";
    if (value === "Finished") return "Đã hoàn thành";
    if (value === "Cancelled") return "Đã hủy";
    return "Đang chờ";
  };

  const columns = React.useMemo(
    () => [
      { Header: "Đơn hàng", accessor: "_id" },
      { Header: "Người đặt hàng", accessor: "user" },
      {
        Header: "Ngày",
        accessor: "dateOrdered",
        Cell: ({ value }) => convertDate(value),
      },
      { Header: "Địa chỉ", accessor: "contact.address" },
      { Header: "Giá trị đơn hàng", accessor: "totalPrice" },
      {
        Header: "TT đơn hàng",
        accessor: "status",
        Cell: ({ value }) => (
          <center>
            <div
              style={{
                padding: "5px 10px",
                color: "#000000",
                borderRadius: "2px",
                minWidth: "100px",
              }}
              className={`status ${value}`}
            >
              {Translate(value)}
            </div>
          </center>
        ),
      },
      {
        Header: "Chi tiết",
        accessor: "",
        Cell: ({ row }) => (
          <button
            style={{ width: "100px", padding: "5px", borderRadius: "5px" }}
            onClick={() => handleDetail1(row.original._id)}
          >
            Chi tiết
          </button>
        ),
      },
    ],
    []
  );

  const handleSearch = (name) => {
    setName(name);
  };

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div>
      <div className="projects">
        {isopen && <Form cart={selectedOrder} setIsOpen={setIsOpen} />}
        <div className="_card">
          <div className="card-header">
            {" "}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                borderRadius: "5px",
                marginBottom: "20px",
              }}
            >
              <span>Quản lý đơn hàng</span>
            </div>
          </div>
          <div className="_card-body">
            <div className="dashboard_cards">
              <Card
                value={statisticsOrders.totalOrders}
                title={"Tổng đơn hàng"}
                icon={faShoppingCart}
                cln={"bcl1"}
              />
              <Card
                value={statisticsOrders.Shipped}
                title={"Đơn hàng đang vận chuyển"}
                icon={faTruck}
                cln={"bcl2"}
              />
              <Card
                value={statisticsOrders.Confirmed}
                title={"Đơn hàng đã xác nhận"}
                icon={faBan}
                cln={"bcl3"}
              />
              <Card
                value={statisticsOrders.Finished}
                title={"Đơn hàng đã hoàn thành"}
                icon={faCheckCircle}
                cln={"bcl4"}
              />
            </div>
            <div
              className="styled-table BrP5 mgt10"
              style={{ marginTop: "10px" }}
            >
              <TopTable
                handleSearch={handleSearch}
                handlePageChange={fetchProducts}
                currentPage={currentPage}
                pageCount={pageCount}
              />
              <OrderBar
                status={status}
                setStatus={setStatus}
                endDate={endDate}
                setEndDate={setEndDate}
                startDate={startDate}
                setStartDate={setStartDate}
                
              />
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
    </div>
  );
};

export default ProductTable;
