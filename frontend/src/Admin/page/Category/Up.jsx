import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Card from "../Dashboard/card";
import {
  getCategoryById,
  updateCategory,
  getStatisticsCategorybyId,
} from "../../service/userService";
import "./style.css";
import Image from "../Product/image";
import { toast } from "react-toastify";
import {
  faListAlt,
  faBoxOpen,
  faBan,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";

function EditCategory() {
  const { id } = useParams();
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [images, setImages] = useState([]);
  const [deletedImageUrls, setDeletedImageUrls] = useState([]);
  const navigate = useNavigate();
  const [statisticsCategory, setStatisticsCategory] = useState([]);
  const fetchStatisticsCategory = async () => {
    try {
      const response = await getStatisticsCategorybyId(id);
      setStatisticsCategory(response.data.data);
    } catch (error) {
      console.log("Lỗi khi lấy danh sách danh mục:", error);
    }
  };

  const fetchData = async () => {
    try {
      const res = await getCategoryById(id);
      setCategoryName(res.data.data.name);
      setCategoryDescription(res.data.data.description);
      setImages([{ url: res.data.data.images }]);
    } catch (error) {
      console.error("Đã xảy ra lỗi khi lấy dữ liệu danh mục:", error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchStatisticsCategory();
  }, [id]);

  const handleSubmit = async () => {
    if (!categoryName || !categoryDescription || selectedImage?.file) {
      alert("Vui lòng điền đầy đủ thông tin và chọn hình ảnh");
      return;
    }

    const formData = new FormData();
    formData.append("name", categoryName);
    formData.append("description", categoryDescription);

    images.forEach((image) => {
      if (image.file) {
        formData.append("images", image.file);
      }
    });

    deletedImageUrls.forEach((imageUrl) => {
      formData.append("dels", imageUrl.url);
    });

    try {
      const res = await updateCategory(formData, id);
      toast.success("Danh mục đã được cập nhật thành công!");
      navigate("/admin/category");
    } catch (error) {
      console.error("Đã xảy ra lỗi khi cập nhật danh mục:", error);
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
            <span>Chỉnh sửa Danh mục</span>
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
              Quay về danh mục
            </button>
          </div>
          <div className="_card-body ">
            <div className="dashboard_cards">
              <Card
                value={statisticsCategory.totalProducts}
                title={"Tổng số sản phẩm"}
                icon={faListAlt}
                cln={"bcl1"}
              />
              <Card
                value={statisticsCategory.totalAvailableProducts}
                title={"Sản phẩm còn bán"}
                icon={faBoxOpen}
                cln={"bcl2"}
              />
              <Card
                value={statisticsCategory.totalOutOfOrderProducts}
                title={"Sản phẩm hết hàng"}
                icon={faBan}
                cln={"bcl3"}
              />
              <Card
                value={statisticsCategory.totalSalesRevenue}
                title={"Doanh thu theo tháng"}
                icon={faExclamationTriangle}
                cln={"bcl4"}
              />
            </div>
            <table className="add-category-table BrP5">
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
