import React, { useEffect, useState } from "react";
import "./Voucher.css";
import {
  getAllVouchers,
  createVoucher,
  deleteVoucher,
  updateVoucher,
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

const VoucherForm = ({ setIsOpen, setIsLoading }) => {
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
      setIsLoading(true);
      const req = await createVoucher(newVoucher);
      toast.success("Thêm phiếu giảm giá thành công");
      setIsLoading(false);
    } catch (err) {
      toast.error(err.data.message);
      setIsLoading(false);
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
const VoucherFormAdd = ({ voucher, setIsOpen, setIsLoading }) => {
  console.log(voucher);
  const [code, setCode] = useState(voucher?.code);
  const [name, setName] = useState(voucher?.name);
  const [amount, setAmount] = useState(voucher?.amount);
  const [conditions, setConditions] = useState(voucher?.conditions);
  const [expiryDate, setExpiryDate] = useState(voucher?.expiryDate);
  const [quantity, setQuantity] = useState(voucher?.quantity);
  const [isAvailable, setIsAvailable] = useState(voucher?.isAvailable);
  const dateObject = new Date(expiryDate);

  const formattedDate = dateObject.toLocaleDateString("en-CA"); // Thay 'en-CA' bằng mã ngôn ngữ mong muốn
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
      setIsLoading(true);
      const req = await updateVoucher(newVoucher, voucher._id);
      toast.success("Thêm phiếu giảm giá thành công");
      setIsLoading(false);
    } catch (err) {
      toast.error(err.data.message);
      setIsLoading(false);
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
              value={formattedDate}
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

function Voucher({ setIsLoading }) {
  const [vouchers, setVouchers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [orderID, setOrderID] = useState("");
  const [order, setOrder] = useState();
  const [showEdit, setShowEdit] = useState(false);
  const [trueCount, setTrueCount] = useState(0);
  const [falseCount, setFalseCount] = useState(0);
  const [status, setStatus] = useState(true);

  useEffect(() => {
    getVouchers(1);
  }, [showEdit, isOpen, status]);

  const getVouchers = async (page) => {
    try {
      setIsLoading(true);
      const response = await getAllVouchers(page, status);
      setVouchers(response.data.data);
      setPageCount(response.data.totalPages);
      setCurrentPage(response.data.currentPage);
      setTrueCount(response.data.trueCount);
      setFalseCount(response.data.falseCount);
      setIsLoading(false);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu phiếu giảm giá:", error);
      setIsLoading(false);
    }
  };

  const handleDelete = (voucherId) => {
    setOrderID(voucherId);
    setShowConfirmation(true);
  };
  const handleEdit = (voucherId) => {
    setOrder(voucherId);
    setShowEdit(true);
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  const handleConfirmDelete = async () => {
    try {
      // Gọi API hoặc xử lý xóa phiếu giảm giá tại đây
      setIsLoading(true);
      await deleteVoucher(orderID);

      const updatedVouchers = vouchers.filter(
        (voucher) => voucher._id !== orderID
      );
      setVouchers(updatedVouchers);
      setShowConfirmation(false);
      alert("Phiếu giảm giá đã được xóa thành công!");
      setIsLoading(false);
    } catch (error) {
      console.error("Lỗi khi xóa phiếu giảm giá:", error);
      alert("Đã xảy ra lỗi khi xóa phiếu giảm giá!");
      setIsLoading(false);
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
            <button
              className="btn-edit"
              onClick={() => handleEdit(row.original)}
            >
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
            Thêm phiếu giảm giá
          </button>
        </div>
        <div className="_card-body">
          <div className="dashboard_cards">
            <Card
              value={trueCount}
              title={"Số phiếu giảm đang mở"}
              icon={faUserShield}
              cln={"bcl1"}
            />
            <Card
              value={falseCount}
              title={"Số phiếu giảm đã đống"}
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
            <div
              onClick={() => setStatus(true)}
              className={`box-status ${status === true ? "ATV" : ""}`}
            >
              Còn mỡ
            </div>
            <div
              onClick={() => setStatus(false)}
              className={`box-status ${status === false ? "ATV" : ""}`}
            >
              Đã đóng
            </div>
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
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
          {isOpen && (
            <VoucherForm setIsLoading={setIsLoading} setIsOpen={setIsOpen} />
          )}
          {showConfirmation && (
            <DeleUser
              orderID={orderID}
              onCancel={handleCancelDelete}
              onConfirm={handleConfirmDelete}
            />
          )}
          {showEdit && (
            <VoucherFormAdd
              voucher={order}
              setIsOpen={setShowEdit}
              setIsLoading={setIsLoading}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Voucher;
