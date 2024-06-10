import "./Dashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const List = ({ title, value, icon, cln }) => {
  return (
    <>
      <div className={`dashboard_card-single ${cln}`}>
        <div>
          <div>{value}</div>
          <span>{title}</span>
        </div>
        <div>
          <FontAwesomeIcon icon={icon} className="icon" />
        </div>
      </div>
    </>
  );
};

export default List;
