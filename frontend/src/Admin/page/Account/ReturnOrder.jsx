import React from "react";
import "./Account.css"; // Import file CSS của component

function DeleUser({ id, onCancel, handleConfirmDelete, title }) {
  return (
    <div className="full">
      {" "}
      <div
        className="dele-user-container"
        style={{ backgroundColor: "#ffffff" }}
      >
        <div className="title">Thông báo</div>
        <div>
          {title}:{id}
        </div>
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
            onClick={() => handleConfirmDelete(id)}
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleUser;
