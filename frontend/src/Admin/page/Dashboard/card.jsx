import "./Dashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const List = ({ title, value, icon, cln }) => {
  return (
    <>
      <div className={`dashboard_card-single ${cln}`}>
        <div>
          <FontAwesomeIcon icon={icon} className="icon" />
        </div>
        <div>
          <span>{title}</span>
          <div>{value}</div>
        </div>
      </div>
    </>
  );
};

export default List;
