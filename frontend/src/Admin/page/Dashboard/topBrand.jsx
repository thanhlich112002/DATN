import "./Dashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProgressBar from "react-bootstrap/ProgressBar";

const List = ({ data }) => {
  console.log(data);
  return (
    <div className="top_sale">
      <div>
        <table>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>
                  <span>Top {index + 1}</span>
                </td>
                <td>
                  <span>{item.name}</span>
                </td>
                <td width={250}>
                  <div className="td_at">
                    <span>{item.value}</span>
                    <ProgressBar
                      variant="success"
                      now={(item.percentage * 100).toFixed(2)}
                      style={{ height: "10px", width: "120px" }}
                    />
                    <span>{(item.percentage * 100).toFixed(2)}%</span>
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
