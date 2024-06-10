import React, { useEffect, useState } from "react";
import { useTable } from "react-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faEdit, faUsers } from "@fortawesome/free-solid-svg-icons";
import "./style.css";
import { getAllCategory } from "../../service/userService";
import DeleteCategoryForm from "./Up"; // Đảm bảo bạn đã import đúng đường dẫn
import { useNavigate } from "react-router-dom";
import Card from "../Dashboard/card";

const CategoryTable = ({ onDelete }) => {
  const [categories, setCategories] = useState([]);
  const [deletingCategory, setDeletingCategory] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategory(1);
        setCategories(response.data.data || []);
      } catch (error) {
        console.log("Lỗi khi lấy danh sách danh mục:", error);
      }
    };
    fetchCategories();
  }, []);

  const truncateDescription = (description) => {
    if (description.length > 100) {
      return description.substring(0, 100) + "...";
    }
    return description;
  };

  const data = React.useMemo(() => categories, [categories]);
  const columns = React.useMemo(
    () => [
      { Header: "ID", accessor: "_id" },
      { Header: "Tên", accessor: "name" },
      {
        Header: "Mô tả",
        accessor: "description",
        Cell: ({ cell: { value } }) => (
          <span title={value}>{truncateDescription(value)}</span>
        ),
      },
      {
        Header: "Hình Ảnh",
        accessor: "images",
        Cell: ({ cell: { value } }) => (
          <img src={value} alt="category" width="70" height="50" />
        ),
      },
      {
        Header: "Hành Động",
        accessor: "actions",
        Cell: ({ row }) => (
          <div className="btn_tab">
            <button className="btn-edit" onClick={() => Add(row.original._id)}>
              <FontAwesomeIcon icon={faEdit} fontSize={20} />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  const handleBackToCategoryList = () => {
    navigate("/admin/tableCategory/add");
  };
  const Add = (id) => {
    navigate(`/admin/tableCategory/${id}`);
  };

  return (
    <div>
      <div className="projects">
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
              <div
                style={{
                  display: "flex",
                  width: "100px",
                  height: "100px",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FontAwesomeIcon
                  icon={faBookmark}
                  fontSize={70}
                  color="#C0C0C0"
                />
              </div>
              <span>Quản lý danh mục</span>
            </div>
            <button
              onClick={handleBackToCategoryList}
              className="background_cl"
            >
              Thêm danh mục
            </button>
          </div>
          {/* <div className="dashboard_cards">
            <Card value={5} title={"Danh mục"} icon={faUsers} cln={"bcl1"} />
            <Card value={5} title={"Khách hàng"} icon={faUsers} cln={"bcl2"} />
            <Card value={5} title={"Khách hàng"} icon={faUsers} cln={"bcl3"} />
            <Card value={5} title={"Khách hàng"} icon={faUsers} cln={"bcl4"} />
          </div> */}
          <div className="_card-body">
            {deletingCategory && (
              <DeleteCategoryForm
                setIsOpen={() => setDeletingCategory(null)}
                category={deletingCategory}
                onDelete={onDelete}
              />
            )}
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
                            cell.column.id === "actions" ? "center-align" : ""
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

export default CategoryTable;
