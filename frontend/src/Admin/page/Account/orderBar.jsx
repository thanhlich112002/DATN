import React, { useEffect, useState } from "react";
import style from "./Account.css";

function TopTable({
  status,
  setStatus,
  endDate,
  setEndDate,
  startDate,
  setStartDate,
}) {
  return (
    <div
      className="orderbar"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
      }}
    >
      <div className="orderbar-status">
        <div
          onClick={() => setStatus("all")}
          className={`box-status ${status === "all" ? "ATV" : ""}`}
        >
          Tất cả
        </div>
        <div
          onClick={() => setStatus("Pending")}
          className={`box-status ${status === "Pending" ? "ATV" : ""}`}
        >
          Chờ xử lý
        </div>
        <div
          onClick={() => setStatus("Confirmed")}
          className={`box-status ${status === "Confirmed" ? "ATV" : ""}`}
        >
          Xác nhận
        </div>
        <div
          onClick={() => setStatus("Shipped")}
          className={`box-status ${status === "Shipped" ? "ATV" : ""}`}
        >
          Vận chuyển
        </div>
        <div
          onClick={() => setStatus("Finished")}
          className={`box-status ${status === "Finished" ? "ATV" : ""}`}
        >
          Hoàn thành
        </div>
        <div
          onClick={() => setStatus("Cancelled")}
          className={`box-status ${status === "Cancelled" ? "ATV" : ""}`}
        >
          Đã hủy
        </div>
      </div>
      <div
        className="orderbar-status"
        style={{
          display: "flex",
          justifyContent: "flex-start",
          gap: "2px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <label>Từ ngày</label>
          <input
            type="date"
            value={new Date(startDate).toISOString().split("T")[0]}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <label>Đến ngày</label>
          <input
            type="date"
            value={new Date(endDate).toISOString().split("T")[0]}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default TopTable;
