import React, { useEffect, useState } from "react";
import "./Voucher.css";
import {
  getAllVouchers,
  createVoucher,
  deleteVoucher,
} from "../../service/userService";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faEdit,
  faTrashAlt,
  faUser,
  faUserCheck,
  faUserShield,
  faUserTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useTable } from "react-table";
import TopTable from "../component/TopTable/TopTable";
import DeleUser from "./DeleUser"; // Import component DeleUser
import Card from "../Dashboard/card";

const VoucherDisplay = ({ voucher, onSave }) => {
  return (
    <div className="voucher-container">
      <h2 className="voucher-heading">Phiếu Giảm Giá</h2>
      <div className="voucher-field">
        <strong>Mã:</strong> {voucher.code}
      </div>

      <div className="voucher-field">
        <strong>Số Tiền Giảm Giá:</strong> {voucher.amount} VND
      </div>
      <div className="voucher-field">
        <strong>Điều Kiện Áp Dụng:</strong> Đơn hàng tối thiểu{" "}
        {voucher.conditions} VND
      </div>
      <div className="voucher-field">
        <strong>Ngày Hết Hạn:</strong>{" "}
        {new Date(voucher.expiryDate).toLocaleDateString()}
      </div>
      <div className="voucher-field">
        <strong>Số Lượng:</strong> {voucher.quantity}
      </div>
      <button className="save-button" onClick={onSave}>
        Hủy
      </button>
    </div>
  );
};

const VoucherForm = ({ onSave, setIsOpen }) => {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const [conditions, setConditions] = useState(0);
  const [expiryDate, setExpiryDate] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isAvailable, setIsAvailable] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newVoucher = {
      code,
      name,
      amount,
      conditions,
      expiryDate,
      quantity,
      isAvailable,
    };
    console.log(newVoucher);
    try {
      const req = await createVoucher(newVoucher);
      toast.success("Thêm phiếu giảm giá thành công");
    } catch (err) {
      toast.error(err.data.message);
    }
    setIsOpen(false);
  };

  return (
    <div className="vouadd">
      <div className="form-container1" style={{ position: "relative" }}>
        <div className="X" onClick={() => setIsOpen(false)}>
          x
        </div>
        <h2 className="voucher-heading">Thêm Phiếu Giảm Giá</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label>Mã</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
          </div>
          <div className="form-field">
            <label>Tên</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-field">
            <label>Số Tiền Giảm Giá (VND)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <div className="form-field">
            <label>Điều Kiện Áp Dụng (VND)</label>
            <input
              type="number"
              value={conditions}
              onChange={(e) => setConditions(e.target.value)}
              required
            />
          </div>
          <div className="form-field">
            <label>Ngày Hết Hạn</label>
            <input
              type="date"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              required
            />
          </div>
          <div className="form-field">
            <label>Số Lượng</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
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
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [orderID, setOrderID] = useState("");

  useEffect(() => {
    getVouchers(1);
  }, []);

  const getVouchers = async (page) => {
    try {
      const response = await getAllVouchers(page);
      setVouchers(response.data.data);
      setPageCount(response.data.totalPages);
      setCurrentPage(page);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu phiếu giảm giá:", error);
    }
  };

  const handleSave = () => {
    alert("Phiếu giảm giá đã được lưu!");
  };

  const handleDelete = (voucherId) => {
    setOrderID(voucherId);
    setShowConfirmation(true);
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  const handleConfirmDelete = async () => {
    try {
      // Gọi API hoặc xử lý xóa phiếu giảm giá tại đây
      await deleteVoucher(orderID);

      const updatedVouchers = vouchers.filter(
        (voucher) => voucher._id !== orderID
      );
      setVouchers(updatedVouchers);
      setShowConfirmation(false);
      alert("Phiếu giảm giá đã được xóa thành công!");
    } catch (error) {
      console.error("Lỗi khi xóa phiếu giảm giá:", error);
      alert("Đã xảy ra lỗi khi xóa phiếu giảm giá!");
    }
  };

  const data = React.useMemo(() => vouchers, [vouchers]);

  const columns = React.useMemo(
    () => [
      {
        Header: "Tên phiếu giảm giá",
        accessor: "name",
      },
      {
        Header: "Mã phiếu",
        accessor: "code",
      },
      {
        Header: "Giá trị giảm giá",
        accessor: "amount",
        Cell: ({ value }) => <span>{value.toLocaleString("vi-VN")} VNĐ</span>,
      },
      {
        Header: "Điều kiện",
        accessor: "conditions",
        Cell: ({ value }) => <span>{value.toLocaleString("vi-VN")} VNĐ</span>,
      },
      {
        Header: "Ngày hết hạn",
        accessor: "expiryDate",
        Cell: ({ value }) => (
          <span>{new Date(value).toLocaleDateString("vi-VN")}</span>
        ),
      },
      {
        Header: "Số lượng",
        accessor: "quantity",
      },
      {
        Header: "Hành động",
        accessor: "actions",
        Cell: ({ row }) => (
          <div className="btn_tab">
            <button className="btn-edit">
              <FontAwesomeIcon icon={faEdit} />
            </button>
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

  useEffect(() => {
    getVouchers(currentPage);
  }, [currentPage]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
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
            <span>Quản lý phiếu giảm giá</span>
          </div>
          <button className="addbut" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? "Đóng form" : "Thêm phiếu giảm giá"}
          </button>
        </div>
        <div className="_card-body">
          <div className="dashboard_cards">
            <Card
              value={1} // Giá trị thực tế của statisticsUser.RoleAdmin
              title={"Số lượng tài khoản Admin"}
              icon={faUserShield}
              cln={"bcl1"}
            />
            <Card
              value={1} // Giá trị thực tế của statisticsUser.RoleUser
              title={"Số lượng tài khoản User"}
              icon={faUser}
              cln={"bcl2"}
            />
            <Card
              value={1} // Giá trị thực tế của statisticsUser.IsVerifiedTrue
              title={"Tài khoản đang hoạt động"}
              icon={faUserCheck}
              cln={"bcl4"}
            />
            <Card
              value={1} // Giá trị thực tế của statisticsUser.IsVerifiedFalse
              title={"Tài khoản đã bị vô hiệu hóa"}
              icon={faUserTimes}
              cln={"bcl3"}
            />
          </div>
          <div className="styled-table BrP5 mgt10">
            <TopTable
              handlePageChange={getVouchers}
              currentPage={currentPage}
              pageCount={pageCount}
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
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {isOpen && (
              <VoucherForm onSave={handleSave} setIsOpen={setIsOpen} />
            )}
            {showConfirmation && (
              <DeleUser
                orderID={orderID}
                onCancel={handleCancelDelete}
                onConfirm={handleConfirmDelete}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Voucher;
