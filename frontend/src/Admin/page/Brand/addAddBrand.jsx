import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { createBrand } from "../../service/userService";
import "./style.css";
import Image from "../Product/image";
import { toast } from "react-toastify";

function AddCategory() {
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [deletedImageUrls, setDeletedImageUrls] = useState([]);
  const handleSubmit = async () => {
    if (!categoryName || !categoryDescription || !images[0]?.file) {
      toast.error("Vui lòng điền đầy đủ thông tin và chọn hình ảnh");
      return;
    }
    const formData = new FormData();

    formData.append("name", categoryName);
    formData.append("description", categoryDescription);
    formData.append("images", images[0]?.file);

    try {
      const res = await createBrand(formData);
      toast.success("Tạo thành công!");
      navigate("/admin/brand");
    } catch (error) {
      toast.error("Đã sảy ra lỗi thửu lại sau");
    } finally {
    }
  };

  const handleBackToCategoryList = () => {
    navigate("/admin/brand");
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
            <span>Thêm Thương Hiệu</span>
            <button
              onClick={handleBackToCategoryList}
              style={{
                gap: "5px",
                display: "flex",
                fontSize: "16px",
                justifyContent: "center",
                alignItems: "center",
              }}
              className="background_cl"
            >
              <FontAwesomeIcon icon={faArrowLeft} />
              Qua về thương hiệu
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
                  <td className="column-1">Tên thương hiệu</td>
                  <td className="column-2">
                    <input
                      type="text"
                      value={categoryName}
                      onChange={(e) => setCategoryName(e.target.value)}
                    />
                  </td>
                </tr>
                <tr className="table-row">
                  <td className="column-1">Mô tả thương hiệu</td>
                  <td className="column-2">
                    <textarea
                      type="text"
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
