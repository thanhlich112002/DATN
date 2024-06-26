import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import {
  getBrandById,
  updateBrand,
  getStatisticsBrandbyId,
} from "../../service/userService";
import {
  faListAlt,
  faBoxOpen,
  faBan,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import Card from "../Dashboard/card";
import "./style.css";
import Image from "../Product/image";
import { toast } from "react-toastify";

function EditCategory({ setIsLoading }) {
  const { id } = useParams();
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [images, setImages] = useState([]);
  const [deletedImageUrls, setDeletedImageUrls] = useState([]);
  const [statisticsCategory, setStatisticsCategory] = useState([]);
  const fetchStatisticsCategory = async () => {
    try {
      setIsLoading(true);
      const response = await getStatisticsBrandbyId(id);
      setStatisticsCategory(response.data.data);
      setIsLoading(false);
    } catch (error) {
      console.log("Lỗi khi lấy danh sách danh mục:", error);
      setIsLoading(false);
    }
  };
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await getBrandById(id);
      setCategoryName(res.data.data.name);
      setCategoryDescription(res.data.data.description);
      setImages([{ url: res.data.data.images }]);
      setIsLoading(false);
    } catch (error) {
      console.error("Đã xảy ra lỗi khi lấy dữ liệu danh mục:", error);
      setIsLoading(false);
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
      setIsLoading(true);
      const res = await updateBrand(formData, id);
      toast.success("Cập nhật thành công!");
      navigate("/admin/brand");
      setIsLoading(false);
    } catch (error) {
      toast.error(error.reponse.data.message);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
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
              className="addbut"
            >
              <FontAwesomeIcon icon={faArrowLeft} />
              Quay về thương hiệu
            </button>
          </div>
          <div className="_card-body BrP5">
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
