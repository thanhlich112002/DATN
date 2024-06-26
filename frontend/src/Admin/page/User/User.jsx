import React, { useEffect, useState } from "react";
import { useTable } from "react-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrashAlt,
  faUserShield,
  faUser,
  faUserTimes,
  faUserCheck,
} from "@fortawesome/free-solid-svg-icons";
import "./style.css";
import { useNavigate } from "react-router-dom";
import {
  getAllUser,
  getStatisticsUser,
  DElUser,
} from "../../service/userService";
import TopTable from "../component/TopTable/TopTable";
import Card from "../Dashboard/card";
import DeleUser from "./DeleUser"; // Import component DeleUser

const ProductTable = ({ setIsLoading }) => {
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [status, setStatus] = useState(true);
  const [role, setRole] = useState("User");
  const [statisticsUser, setStatisticsUser] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [userId, setUserId] = useState("");

  const fetchProducts = async (page, status, role) => {
    try {
      setIsLoading(true);
      const response = await getAllUser(page, status, role);
      setProducts(response.data.data);
      setPageCount(response.data.totalPages);
      setCurrentPage(page);
      setIsLoading(false);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách người dùng:", error);
      setIsLoading(false);
    }
  };

  const fetchStatisticsUser = async () => {
    try {
      setIsLoading(true);
      const response = await getStatisticsUser();
      setStatisticsUser(response.data.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Lỗi khi lấy thống kê người dùng:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStatisticsUser();
    fetchProducts(currentPage, status, role);
  }, [currentPage, status, role]);

  const data = React.useMemo(() => products, [products]);

  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "_id",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Họ",
        accessor: "lastName",
      },
      {
        Header: "Tên",
        accessor: "firstName",
      },
      {
        Header: "Vai trò",
        accessor: "role",
      },
      {
        Header: "Hành Động",
        accessor: "actions",
        Cell: ({ row }) => (
          <div className="btn_tab">
            {/* <button className="btn-edit">
              <FontAwesomeIcon icon={faEdit} />
            </button> */}
            <button
              className="btn-delete"
              onClick={() => handleDelete(row.original._id)}
            >
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const handleSearch = (name) => {
    setName(name);
  };

  const handleDelete = (userId) => {
    setUserId(userId);
    setShowConfirmation(true);
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  const handleConfirmDelete = async (id) => {
    setIsLoading(true);
    await DElUser(id);
    fetchProducts(currentPage, status, role);
    setShowConfirmation(false);
    setIsLoading(false);
  };

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div>
      {showConfirmation && (
        <DeleUser
          userId={userId}
          onCancel={handleCancelDelete}
          onConfirm={handleConfirmDelete}
        />
      )}
      <div className="projects">
        <div className="_card">
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
              <span>Quản lý người dùng</span>
            </div>
          </div>
          <div className="_card-body">
            <div className="dashboard_cards">
              <Card
                value={statisticsUser.RoleAdmin}
                title={"Số lượng tài khoản Admin"}
                icon={faUserShield}
                cln={"bcl1"}
              />
              <Card
                value={statisticsUser.RoleUser}
                title={"Số lượng tài khoản User"}
                icon={faUser}
                cln={"bcl2"}
              />
              {/* <Card
                value={statisticsUser.IsVerifiedTrue}
                title={"Tài khoản đang hoạt động"}
                icon={faUserCheck}
                cln={"bcl4"}
              />
              <Card
                value={statisticsUser.IsVerifiedFalse}
                title={"Tài khoản đã bị vô hiệu hóa"}
                icon={faUserTimes}
                cln={"bcl3"}
              /> */}
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
              <div className="orderbar">
                <div className="orderbar-status">
                  <div
                    onClick={() => setRole("User")}
                    className={`box-status ${role === "User" ? "ATV" : ""}`}
                  >
                    Tài khoản Khách hàng
                  </div>
                  <div
                    onClick={() => setRole("Admin")}
                    className={`box-status ${role === "Admin" ? "ATV" : ""}`}
                  >
                    Tài khoản Admin
                  </div>
                </div>

                {/* <div className="orderbar-status">
                  <label>Trạng thái</label>
                  <select
                    className="ATV"
                    value={status}
                    onChange={(e) => setStatus(e.target.value === "true")}
                  >
                    <option value={true}>Còn hoạt động</option>
                    <option value={false}>Đã khóa</option>
                  </select>
                </div> */}
              </div>
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
