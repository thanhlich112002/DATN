import React from "react";
import "./style.css"; // Import file CSS của component

function DeleUser({ userId, onCancel, handleConfirmDelete }) {
  return (
    <div className="full">
      {" "}
      <div className="dele-user-container">
        <div className="title">Thông báo</div>
        <div>Bạn có chắc chắn muốn khóa tài khoản id: ${userId}?</div>
        <div className="button-container">
          <button
            className="addbut"
            style={{
              minWidth: "90px",
              display: "flex",
              justifyContent: "center",
            }}
            onClick={() => onCancel()}
          >
            Hủy
          </button>
          <button
            style={{
              minWidth: "90px",
              display: "flex",
              justifyContent: "center",
            }}
            className="addbut"
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleUser;
