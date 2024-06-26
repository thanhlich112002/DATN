import React, { useEffect, useState } from "react";
import { useTable } from "react-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faEdit } from "@fortawesome/free-solid-svg-icons";
import "./style.css";
import {
  getAllBrands,
  searchBrands,
  getStatisticsBrand,
} from "../../service/userService";
import UpBrand from "./UpBrand";
import { useNavigate } from "react-router-dom";
import TopTable from "../component/TopTable/TopTable";
import Card from "../Dashboard/card";
import {
  faListAlt,
  faBoxOpen,
  faBan,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";

const BrandTable = ({ onDelete,setIsLoading }) => {
  const [categories, setCategories] = useState([]);
  const [deletingCategory, setDeletingCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [statisticsCategory, setStatisticsCategory] = useState([]);
  const fetchStatisticsCategory = async () => {
    try {
      setIsLoading(true);
      const response = await getStatisticsBrand();
      setStatisticsCategory(response.data.data);
      setIsLoading(false);
    } catch (error) {
      console.log("Lỗi khi lấy danh sách danh mục:", error);
      setIsLoading(false);
    }
  };

  const fetchCategories = async (page) => {
    try {
      setIsLoading(true);
      const response = await getAllBrands(page);
      setCategories(response.data.data);
      setPageCount(response.data.totalPages);
      setCurrentPage(response.data.currentPage);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log("Lỗi khi lấy danh sách thương hiệu:", error);
    }
  };

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
          <div className="btn_tab" width={150}>
            <button className="btn-edit" onClick={() => Add(row.original._id)}>
              <FontAwesomeIcon icon={faEdit} fontSize={20} />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const fetchSProducts = async (searchTerm, page) => {
    try {
      const response = await searchBrands(searchTerm, page);
      setCategories(response.data.data);
      setPageCount(response.data.totalPages);
      setCurrentPage(response.data.currentPage);
    } catch (error) {
      console.error("Lỗi khi tìm kiếm thương hiệu:", error);
    }
  };

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  const handleBackToCategoryList = () => {
    navigate("/admin/brand/add");
  };

  const Add = (id) => {
    navigate(`/admin/brand/${id}`);
  };

  const handleSearch = (name) => {
    setName(name);
  };
  useEffect(() => {
    fetchStatisticsCategory();
  }, []);

  useEffect(() => {
    console.log(name);
    if (name) {
      fetchSProducts(name, currentPage);
    } else {
      fetchCategories(currentPage);
    }
  }, [currentPage, name]);

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
              <span>Quản lý thương hiệu</span>
            </div>
            <button onClick={handleBackToCategoryList} className="addbut">
              Thêm thương hiệu
            </button>
          </div>
          <div className="dashboard_cards">
            <Card
              value={statisticsCategory.totalBrands}
              title={"Tổng thương hiệu"}
              icon={faListAlt}
              cln={"bcl1"}
            />
            <Card
              value={statisticsCategory.totalBrandsWithAvailableProducts}
              title={"Có sản phẩm còn bán"}
              icon={faBoxOpen}
              cln={"bcl2"}
            />
            <Card
              value={statisticsCategory.totalBrandsWithZeroProducts}
              title={"Có sản phẩm hết hàng"}
              icon={faBan}
              cln={"bcl3"}
            />
            <Card
              value={statisticsCategory.totalBrandsOutOfStock}
              title={"Không có sản phẩm"}
              icon={faExclamationTriangle}
              cln={"bcl4"}
            />
          </div>
          <div className="_card-body BrP5 ">
            {deletingCategory && (
              <UpBrand
                setIsOpen={() => setDeletingCategory(null)}
                category={deletingCategory}
                onDelete={onDelete}
              />
            )}
            <div className="styled-table ">
              <TopTable
                handleSearch={handleSearch}
                handlePageChange={fetchCategories}
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
    </div>
  );
};

export default BrandTable;
