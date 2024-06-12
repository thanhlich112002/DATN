import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { getBrandById, updateBrand } from "../../service/userService";
import "./style.css";
import Image from "../Product/image";
import { toast } from "react-toastify";

function EditCategory() {
  const { id } = useParams();
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [images, setImages] = useState([]);
  const [deletedImageUrls, setDeletedImageUrls] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await getBrandById(id);
      setCategoryName(res.data.data.name);
      setCategoryDescription(res.data.data.description);
      setImages([{ url: res.data.data.images }]);
    } catch (error) {
      console.error("Đã xảy ra lỗi khi lấy dữ liệu danh mục:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleSubmit = async () => {
    if (!categoryName || !categoryDescription || selectedImage?.file) {
      alert("Vui lòng điền đầy đủ thông tin và chọn hình ảnh");
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("name", categoryName);
    console.log(deletedImageUrls, categoryDescription, categoryName);
    formData.append("description", categoryDescription);
    console.log(images.file);
    images.forEach((image) => {
      if (image.file) {
        formData.append("images", image.file);
      }
    });
    deletedImageUrls.forEach((imageUrl) => {
      console.log(imageUrl);
      formData.append("dels", imageUrl.url);
    });
    try {
      const res = await updateBrand(formData, id);
      toast.success("Cập nhật thành công!");
      navigate("/admin/brand");
    } catch (error) {
      toast.error(error.reponse.data.message);
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
            <span>Chỉnh sửa thương hiệu</span>
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
              Quay về thương hiệu
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

export default EditCategory;
