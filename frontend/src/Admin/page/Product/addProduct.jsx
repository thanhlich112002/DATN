import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import {
  getAllCategory,
  getAllBrands,
  addproduct,
} from "../../service/userService";
import "./style.css";
import Image from "../Product/image";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddCategory({ setIsLoading }) {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    origin: "",
    IncenseGroup: "",
    quantity: "",
    inputprice: "",
  });
  const [images, setImages] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [brandId, setBrandId] = useState("");
  const [formData, setFormData] = useState(null);
  const [deletedImageUrls, setDeletedImageUrls] = useState([]);
  const navigate = useNavigate();

  const handleBackToCategoryList = () => {
    navigate("/admin/product");
  };

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      const categoriesData = await getAllCategory(1, 100);
      setCategories(categoriesData.data.data);
      if (categoriesData.data.data.length > 0) {
        setCategoryId(categoriesData.data.data[0]._id);
      }
      setIsLoading(false);
    };

    const fetchBrands = async () => {
      setIsLoading(true);
      const brandsData = await getAllBrands();
      setBrands(brandsData.data.data);
      if (brandsData.data.data.length > 0) {
        setBrandId(brandsData.data.data[0]._id);
      }
      setIsLoading(false);
    };

    fetchCategories();
    fetchBrands();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (product && images) {
      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("price", product.price);
      formData.append("description", product.description);
      formData.append("origin", product.origin);
      formData.append("IncenseGroup", product.IncenseGroup);
      formData.append("inputprice", product.inputprice);
      formData.append("quantity", product.quantity);
      images.forEach((image) => {
        formData.append("images", image.file);
      });
      formData.append("brandId", brandId);
      formData.append("categoryId", categoryId);
      setFormData(formData);
    }
  }, [product, images, brandId, categoryId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(images.length);

    if (
      !product.name ||
      !product.price ||
      !product.description ||
      !product.origin ||
      !product.IncenseGroup ||
      !brandId ||
      !categoryId ||
      images.length === 0
    ) {
      toast.error("Vui lòng điền đầy đủ thông tin sản phẩm.");
      return;
    }

    // Tạo formData
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("description", product.description);
    formData.append("origin", product.origin);
    formData.append("IncenseGroup", product.IncenseGroup);
    formData.append("inputprice", product.inputprice);
    formData.append("quantity", product.quantity);
    images.forEach((image) => {
      formData.append("images", image.file);
    });
    formData.append("brandId", brandId);
    formData.append("categoryId", categoryId);
    try {
      setIsLoading(true);
      await addproduct(formData);
      setProduct({
        name: "",
        price: "",
        description: "",
        origin: "",
        IncenseGroup: "",
        quantity: "",
        inputprice: "",
      });
      setImages([]);
      setDeletedImageUrls([]);
      toast.success("Thêm sản phẩm thành công!");
      navigate("/admin/product");
      setIsLoading(false);
    } catch (error) {
      console.log("Đã xảy ra lỗi khi thêm sản phẩm:", error);
      toast.error("Đã xảy ra lỗi khi thêm sản phẩm!");
      setIsLoading(false);
    }
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
              Qua về sản phẩm
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
                    max={3}
                  />
                </div>
              </div>
              <tbody>
                <tr className="table-row">
                  <td className="column-1"> Tên sản phẩm</td>
                  <td className="column-2">
                    <input
                      type="text"
                      className="field__input"
                      name="name"
                      value={product.name}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr className="table-row">
                  <td className="column-1">Giá nhập vào</td>
                  <td className="column-2">
                    <input
                      type="text"
                      className="field__input"
                      name="inputprice"
                      value={product.inputprice}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr className="table-row">
                  <td className="column-1">Giá bán ra</td>
                  <td className="column-2">
                    <input
                      type="text"
                      className="field__input"
                      name="price"
                      value={product.price}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr className="table-row">
                  <td className="column-1">Số lượng</td>
                  <td className="column-2">
                    <input
                      type="text"
                      className="field__input"
                      name="quantity"
                      value={product.quantity}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr className="table-row">
                  <td className="column-1">Xuất xứ</td>
                  <td className="column-2">
                    <input
                      type="text"
                      className="field__input"
                      name="origin"
                      value={product.origin}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr className="table-row">
                  <td className="column-1"> Nhóm hương</td>
                  <td className="column-2">
                    <input
                      type="text"
                      className="field__input"
                      name="IncenseGroup"
                      value={product.IncenseGroup}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr className="table-row">
                  <td className="column-1">Mô tả</td>
                  <td className="column-2">
                    <textarea
                      className="field__input"
                      name="description"
                      value={product.description}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr className="table-row">
                  <td className="column-1">Thương hiệu</td>
                  <td className="column-2">
                    <select
                      name="brandId"
                      id="brand"
                      className="field__input"
                      value={brandId}
                      onChange={(e) => setBrandId(e.target.value)}
                    >
                      {brands.map((brand) => (
                        <option key={brand._id} value={brand._id}>
                          {brand.name}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
                <tr className="table-row">
                  <td className="column-1"> Danh mục</td>
                  <td className="column-2">
                    <select
                      name="categoryId"
                      id="category"
                      className="field__input"
                      value={categoryId}
                      onChange={(e) => setCategoryId(e.target.value)}
                    >
                      {categories.map((category) => (
                        <option key={category._id} value={category._id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
                <tr className="table-row">
                  <td className="column-1">
                    <button className="btn" onClick={handleSubmit}>
                      Lưu
                    </button>
                  </td>
                  <td className="column-2">
                    <button className="btn">Xóa</button>
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
