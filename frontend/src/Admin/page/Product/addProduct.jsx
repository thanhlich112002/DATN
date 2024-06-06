import React, { useState, useEffect } from "react";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Image from "./image";
import {
  getAllCategory,
  getAllBrand,
  addproduct,
} from "../../service/userService";

function AddProductForm({ setIsOpen }) {
  const [brandId, setBrandId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    origin: "",
    IncenseGroup: "",
  });
  const [images, setImages] = useState([]);
  const [deletedImageUrls, setDeletedImageUrls] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesData = await getAllCategory();
      setCategories(categoriesData.data.data);
      if (categoriesData.data.data.length > 0) {
        setCategoryId(categoriesData.data.data[0]._id);
      }
    };

    const fetchBrands = async () => {
      const brandsData = await getAllBrand();
      setBrands(brandsData.data.data);
      if (brandsData.data.data.length > 0) {
        setBrandId(brandsData.data.data[0]._id);
      }
    };

    fetchCategories();
    fetchBrands();
  }, []);

  useEffect(() => {
    if (product && images) {
      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("price", product.price);
      formData.append("description", product.description);
      formData.append("origin", product.origin);
      formData.append("IncenseGroup", product.IncenseGroup);
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
    e.preventDefault(); // Prevent the default form submission behavior
    console.log(images.length);

    // Kiểm tra các trường thông tin sản phẩm có được điền đầy đủ không
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
      console.log("Vui lòng điền đầy đủ thông tin sản phẩm.");
      return;
    }

    // Tạo formData
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("description", product.description);
    formData.append("origin", product.origin);
    formData.append("IncenseGroup", product.IncenseGroup);
    images.forEach((image) => {
      formData.append("images", image.file);
    });
    formData.append("brandId", brandId);
    formData.append("categoryId", categoryId);

    // Gọi hàm addproduct từ service
    try {
      await addproduct(formData);
      setProduct({
        name: "",
        price: "",
        description: "",
        origin: "",
        IncenseGroup: "",
      });
      setImages([]);
      setDeletedImageUrls([]);
      console.log("Thêm sản phẩm thành công!");
    } catch (error) {
      console.log("Đã xảy ra lỗi khi thêm sản phẩm:", error);
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
          <span>Thông tin mua hàng</span>
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginBottom: "10px",
          }}
        >
          <div
            style={{
              width: "55%",
            }}
          >
            <Image
              images={images}
              setImages={setImages}
              setDeletedImageUrls={setDeletedImageUrls}
            />
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "10px" }}
        >
          <div className="field__input-wrapper">
            <label htmlFor="name" className="field__label">
              Tên sản phẩm
            </label>
            <input
              type="text"
              className="field__input"
              name="name"
              value={product.name}
              onChange={handleChange}
            />
          </div>
          <div className="field__input-wrapper">
            <label htmlFor="price" className="field__label">
              Giá
            </label>
            <input
              type="text"
              className="field__input"
              name="price"
              value={product.price}
              onChange={handleChange}
            />
          </div>
          <div className="field__input-wrapper">
            <label htmlFor="description" className="field__label">
              Mô tả
            </label>
            <textarea
              className="field__input"
              name="description"
              value={product.description}
              onChange={handleChange}
            />
          </div>
          <div style={{ display: "flex", width: "100%", gap: "10px" }}>
            <div className="field__input-wrapper" style={{ width: "50%" }}>
              <label htmlFor="origin" className="field__label">
                Xuất xứ
              </label>
              <input
                type="text"
                className="field__input"
                name="origin"
                value={product.origin}
                onChange={handleChange}
              />
            </div>
            <div className="field__input-wrapper" style={{ width: "50%" }}>
              <label htmlFor="IncenseGroup" className="field__label">
                Nhóm hương
              </label>
              <input
                type="text"
                className="field__input"
                name="IncenseGroup"
                value={product.IncenseGroup}
                onChange={handleChange}
              />
            </div>
          </div>
          <div style={{ display: "flex", width: "100%", gap: "10px" }}>
            <div className="field__input-wrapper" style={{ width: "50%" }}>
              <label htmlFor="brand" className="field__label">
                Thương hiệu
              </label>
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
            </div>
            <div className="field__input-wrapper" style={{ width: "50%" }}>
              <label htmlFor="category" className="field__label">
                Danh mục
              </label>
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
            </div>
          </div>

          <div>
            <div className="cart1_button dmk">
              <div className="Cart1_item_rigth">
                <button type="submit">Thêm sản phẩm</button>
              </div>
            </div>
          </div>
          <div></div>
        </form>
      </div>
    </div>
  );
}

export default AddProductForm;
