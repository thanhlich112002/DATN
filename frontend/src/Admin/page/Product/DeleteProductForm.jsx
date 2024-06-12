import React from "react";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { deleteproduct } from "../../service/userService";

function DeleteProductForm({ setIsOpen, item }) {
  const handleDelete = async () => {
    try {
      await deleteproduct(item._id);
      console.log("Xóa sản phẩm thành công!");
      setIsOpen(false);
    } catch (error) {
      console.log("Đã xảy ra lỗi khi xóa sản phẩm:", error);
    }
  };

  return (
    <div className="deletaf">
      <div className="Form_dele">
        <div
          className="X"
          onClick={() => {
            setIsOpen(false);
          }}
        >
          <FontAwesomeIcon icon={faTimes} />
        </div>
        <div className="checkout_left_top">
          <span>Bạn muốn xóa sản phẩm {item.name}?</span>
        </div>
        <form
          onSubmit={handleDelete}
          style={{ display: "flex", flexDirection: "column", gap: "10px" }}
        >
          <div className="delete_bottom">
            <button
              type="button"
              onClick={handleDelete}
              className="delete-button"
            >
              Xóa
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DeleteProductForm;
