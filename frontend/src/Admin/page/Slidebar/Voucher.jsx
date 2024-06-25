import React, { useEffect, useState } from "react";
import "./Voucher.css";
import {
  getAllSidebar,
  createSidebar,
  updateSidebar,
} from "../../service/userService";
import { toast } from "react-toastify";
import { useTable } from "react-table";
import TopTable from "../component/TopTable/TopTable";
import Image from "../Product/image";

const VoucherForm = ({ setIsOpen }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", code);
      formData.append("images", images[0]?.file);
      const req = await createSidebar(formData);
      toast.success("Thêm phiếu quảng cáo thành công");
    } catch (err) {
      toast.error(err.data.message);
    }
    setIsOpen(false);
  };
  const [images, setImages] = useState([]);
  const [code, setCode] = useState("");
  const [deletedImageUrls, setDeletedImageUrls] = useState([]);

  return (
    <div className="vouadd">
      <div className="form-container1" style={{ position: "relative" }}>
        <div className="X" onClick={() => setIsOpen(false)}>
          x
        </div>
        <h2 className="voucher-heading">Thêm quảng cáo</h2>
        <form onSubmit={handleSubmit}>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginBottom: "10px",
              padding: "10px 100px",
            }}
          >
            <Image
              images={images}
              setImages={setImages}
              setDeletedImageUrls={setDeletedImageUrls}
              max={1}
            />
          </div>
          <div className="form-field">
            <label>Tên</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="add-button">
            Lưu
          </button>
        </form>
      </div>
    </div>
  );
};

function Voucher() {
  const [vouchers, setVouchers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getVouchers(1);
  }, [isOpen]);

  const getVouchers = async (page) => {
    try {
      const response = await getAllSidebar(page);
      setVouchers(response.data.data);
      setPageCount(response.data.totalPages);
      setCurrentPage(response.data.currentPage);
    } catch (error) {
      console.error("Error fetching vouchers:", error);
    }
  };

  const handleSave = () => {
    toast.success("Voucher saved successfully!");
  };

  const data = React.useMemo(() => vouchers, [vouchers]);

  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "_id",
      },
      {
        Header: "Tên",
        accessor: "name",
      },
      {
        Header: "Image",
        accessor: "img",
        Cell: ({ cell: { value } }) => (
          <img src={value} alt="voucher" width="70px" />
        ),
      },

      {
        Header: "Available",
        accessor: "actions",
        Cell: ({ row }) => (
          <div className="btn_tab">
            <input
              type="checkbox"
              defaultChecked={row.original.isAvailable}
              onClick={() => handleToggleAvailability(row.original._id)}
            />
          </div>
        ),
      },
    ],
    []
  );

  useEffect(() => {
    getVouchers(currentPage);
  }, [currentPage]);

  const handleToggleAvailability = async (id) => {
    try {
      await updateSidebar(id);
      getVouchers(currentPage);
    } catch (err) {}
  };

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div className="projects">
      <div className="_card">
        <div className="card-header">
          <div className="header-content">
            <span>Quản lý quảng cáo</span>
          </div>
          <button className="addbut" onClick={() => setIsOpen(!isOpen)}>
            Thêm phiếu giảm giá
          </button>
        </div>
        <div className="_card-body">
          <div className="styled-table-wrapper">
            <TopTable
              handlePageChange={getVouchers}
              currentPage={currentPage}
              pageCount={pageCount}
            />
          </div>
          <table {...getTableProps()} className="styled-table">
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()} key={column.id}>
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
                  <tr {...row.getRowProps()} key={row.id}>
                    {row.cells.map((cell) => (
                      <td {...cell.getCellProps()} key={cell.column.id}>
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
          {isOpen && <VoucherForm onSave={handleSave} setIsOpen={setIsOpen} />}
        </div>
      </div>
    </div>
  );
}

export default Voucher;
