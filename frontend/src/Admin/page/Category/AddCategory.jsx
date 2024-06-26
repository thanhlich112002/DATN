import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { createCategory } from "../../service/userService";
import "./style.css";
import Image from "../Product/image";
import { toast } from "react-toastify";

function AddCategory({ setIsLoading }) {
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [deletedImageUrls, setDeletedImageUrls] = useState([]);

  const handleSubmit = async () => {
    if (!categoryName || !categoryDescription || !images[0]?.file) {
      alert("Vui lòng điền đầy đủ thông tin và chọn hình ảnh");
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();

    formData.append("name", categoryName);
    formData.append("description", categoryDescription);
    formData.append("images", images[0]?.file);

    try {
      setIsLoading(true);
      const res = await createCategory(formData);
      toast.success("Danh mục đã được tạo thành công!");
      navigate("/admin/category");
      setIsLoading(false);
    } catch (error) {
      console.error("Đã xảy ra lỗi khi tạo danh mục:", error);
      setError(error.message || "Đã xảy ra lỗi khi tạo danh mục");
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToCategoryList = () => {
    navigate("/admin/category");
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
              style={{
                gap: "5px",
                display: "flex",
                fontSize: "16px",
                justifyContent: "center",
                alignItems: "center",
              }}
              className="addbut"
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
                  marginBottom: "10px",
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "10px",
                    padding: "10px 100px",
                  }}
                >
                  <Image
                    images={images}
                    setImages={setImages}
                    setDeletedImageUrls={setDeletedImageUrls}
                    max={1}
                  />
                </div>
              </div>
              <tbody>
                <tr className="table-row">
                  <td className="column-1">Tên danh mục</td>
                  <td className="column-2">
                    <input
                      type="text"
                      className="field__input"
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
                      className="field__input"
                      value={categoryDescription}
                      onChange={(e) => setCategoryDescription(e.target.value)}
                    />
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
