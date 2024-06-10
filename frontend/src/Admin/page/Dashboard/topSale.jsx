import React from "react";
import "./Dashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProgressBar from "react-bootstrap/ProgressBar";

const List = ({ products }) => {
  return (
    <div className="top_sale">
      <div>
        <table>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td className="product-cell">
                  <img src={product?.productInfo[0]?.images[0]} alt="" />
                  <span>{product?.productInfo[0]?.name}</span>
                </td>
                <td width={250}>
                  <div className="td_at">
                    <span>{product.totalQuantity}</span>
                    <ProgressBar
                      variant="success"
                      now={product.percentage.toFixed(2)}
                      max={100}
                      style={{ height: "10px", width: "120px" }}
                    />
                    <span>{product.percentage.toFixed(2)}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default List;
