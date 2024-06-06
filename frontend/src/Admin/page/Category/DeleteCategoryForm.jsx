import React from "react";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const DeleteCategoryForm = ({ setIsOpen, category, onDelete }) => {
  const handleDelete = async () => {
    try {
      await onDelete(category._id);
      console.log("Xóa danh mục thành công!");
      setIsOpen(false);
    } catch (error) {
      console.log("Đã xảy ra lỗi khi xóa danh mục:", error);
    }
  };

  return (
    <div className="full">
      <div className="Form_Add">
        <div
          className="X"
          onClick={() => {
            setIsOpen(false);
          }}
        >
          <FontAwesomeIcon icon={faTimes} />
        </div>
        <div className="checkout_left_top">
          <span>Bạn muốn xóa danh mục {category.name}?</span>
        </div>
        <button onClick={handleDelete} className="delete-button">
          Xóa
        </button>
      </div>
    </div>
  );
};

export default DeleteCategoryForm;
