import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { createCategory } from "../../service/userService";
import "./style.css";

function AddCategory() {
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleChooseImage = () => {
    inputRef.current.click();
  };

  const handleSubmit = async () => {
    // Kiểm tra nếu có trường nào trống
    if (!categoryName || !categoryDescription || !selectedImage) {
      alert("Vui lòng điền đầy đủ thông tin và chọn hình ảnh");
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();

    formData.append("name", categoryName);
    formData.append("description", categoryDescription);
    formData.append("images", selectedImage);

    try {
      const res = await createCategory(formData);
      console.log("Danh mục đã được tạo thành công!");
      alert("Danh mục đã được tạo thành công!");
      navigate("/admin/tableCategory");
    } catch (error) {
      console.error("Đã xảy ra lỗi khi tạo danh mục:", error);
      setError(error.message || "Đã xảy ra lỗi khi tạo danh mục");
    } finally {
      setLoading(false);
    }
  };

  const handleBackToCategoryList = () => {
    navigate("/admin/tableCategory");
  };

  const handleResetForm = () => {
    setCategoryName("");
    setCategoryDescription("");
    setSelectedImage(null);
  };

  return (
    <div>
      <div className="projects">
        <div className="_card">
          <div className="card-header">
            <span>Thêm Danh mục</span>
            <button
              onClick={handleBackToCategoryList}
              style={{ gap: "5px", display: "flex" }}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
              Qua về danh mục
            </button>
          </div>
          <div className="_card-body">
            <table className="add-category-table">
              <div
                style={{
                  marginTop: "30px",
                  marginBottom: "30px",
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                {selectedImage ? (
                  <img
                    style={{ width: "40%", borderRadius: "5px" }}
                    src={URL.createObjectURL(selectedImage)}
                    alt=""
                  />
                ) : (
                  <img
                    style={{ width: "80%", height: "300px" }}
                    src="https://res.cloudinary.com/dzy3cnyb6/image/upload/v1716366995/perfume/zye8px4t5uyrrh9epr8y.png"
                    alt=""
                  />
                )}
              </div>
              <tbody>
                <tr className="table-row">
                  <td className="column-1">Tên danh mục</td>
                  <td className="column-2">
                    <input
                      type="text"
                      value={categoryName}
                      onChange={(e) => setCategoryName(e.target.value)}
                    />
                  </td>
                </tr>
                <tr className="table-row">
                  <td className="column-1">Mô tả danh mục</td>
                  <td className="column-2">
                    <textarea
                      type="text"
                      value={categoryDescription}
                      onChange={(e) => setCategoryDescription(e.target.value)}
                    />
                  </td>
                </tr>
                <tr className="table-row">
                  <td className="column-1">Chọn ảnh</td>
                  <td className="column-2">
                    <input
                      ref={inputRef}
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handleImageChange}
                    />
                    <button onClick={handleChooseImage}>Chọn ảnh</button>
                  </td>
                </tr>
                <tr className="table-row">
                  <td className="column-1">
                    <button className="btn" onClick={handleSubmit}>
                      Lưu
                    </button>
                  </td>
                  <td className="column-2">
                    <button className="btn" onClick={handleResetForm}>
                      Xóa
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddCategory;
