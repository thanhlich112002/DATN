import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faBox,
  faDollarSign,
  faReceipt,
} from "@fortawesome/free-solid-svg-icons";
import "./Dashboard.css";

function Dashboard() {
  return (
    <div>
      <div className="dashboard_top">
        <div className="dashboard_cards">
          <div className="dashboard_card-single">
            <div>
              <div>54</div>
              <span>Khách hàng</span>
            </div>
            <div>
              <FontAwesomeIcon icon={faUsers} className="icon" />
            </div>
          </div>
          <div className="dashboard_card-single">
            <div>
              <div>123</div>
              <span>Sản phẩm</span>
            </div>
            <div>
              <FontAwesomeIcon icon={faBox} className="icon" />
            </div>
          </div>
          <div className="dashboard_card-single">
            <div>
              <div>$10,000</div>
              <span>Doanh thu</span>
            </div>
            <div>
              <FontAwesomeIcon icon={faDollarSign} className="icon" />
            </div>
          </div>
          <div className="dashboard_card-single">
            <div>
              <div>23</div>
              <span>Đơn hàng</span>
            </div>
            <div>
              <FontAwesomeIcon icon={faReceipt} className="icon" />
            </div>
          </div>
        </div>
        <div className="recent-grid">
          <div className="projects">
            <div className="_card">
              <div className="card-header">
                <span>Đơn hàng</span>
                <button>xem thêm</button>
              </div>
              <div className="card-body">
                <table>
                  <thead>
                    <tr>
                      <td>Title</td>
                      <td>Title</td>
                      <td>Title</td>
                      <td>Title</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Thanh Lich</td>
                      <td>Thanh Lich</td>
                      <td>Thanh Lich</td>
                      <td>
                        <span className="status"></span>
                        review
                      </td>
                    </tr>
                    <tr>
                      <td>Thanh Lich</td>
                      <td>Thanh Lich</td>
                      <td>Thanh Lich</td>
                      <td>
                        <span className="status"></span>
                        review
                      </td>
                    </tr>
                    <tr>
                      <td>Thanh Lich</td>
                      <td>Thanh Lich</td>
                      <td>Thanh Lich</td>
                      <td>
                        <span className="status"></span>
                        review
                      </td>
                    </tr>
                    <tr>
                      <td>Thanh Lich</td>
                      <td>Thanh Lich</td>
                      <td>Thanh Lich</td>
                      <td>
                        <span className="status"></span>
                        review
                      </td>
                    </tr>
                    <tr>
                      <td>Thanh Lich</td>
                      <td>Thanh Lich</td>
                      <td>Thanh Lich</td>
                      <td>
                        <span className="status"></span>
                        review
                      </td>
                    </tr>
                    <tr>
                      <td>Thanh Lich</td>
                      <td>Thanh Lich</td>
                      <td>Thanh Lich</td>
                      <td>
                        <span className="status"></span>
                        review
                      </td>
                    </tr>
                    <tr>
                      <td>Thanh Lich</td>
                      <td>Thanh Lich</td>
                      <td>Thanh Lich</td>
                      <td>
                        <span className="status"></span>
                        review
                      </td>
                    </tr>
                    <tr>
                      <td>Thanh Lich</td>
                      <td>Thanh Lich</td>
                      <td>Thanh Lich</td>
                      <td>
                        <span className="status"></span>
                        review
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="customers">
            <div className="card">
              <div className="card-header">
                <span>Người dùng mới</span>
                <button>see all</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
