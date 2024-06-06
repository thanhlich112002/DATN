import React, { useState, useEffect } from "react";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Image from "./image";
import {
  getAllCategory,
  getAllBrand,
  upproduct,
} from "../../service/userService";

function UpdateProduct({ setIsOpenAdd, Item }) {
  const [brandId, setBrandId] = useState(Item.Brand?._id || "");
  const [categoryId, setCategoryId] = useState(Item.Category?._id || "");
  const [product, setProduct] = useState({
    name: Item.name,
    price: Item.price,
    description: Item.description,
    origin: Item.origin,
    IncenseGroup: Item.IncenseGroup,
  });
  console.log(Item);
  const [images, setImages] = useState([]);
  const [deletedImageUrls, setDeletedImageUrls] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  useEffect(() => {
    const newImages = Item.images.map((image) => ({
      url: image,
    }));
    setImages(newImages);
  }, [Item.images]);

  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesData = await getAllCategory();
      setCategories(categoriesData.data.data);
    };

    const fetchBrands = async () => {
      const brandsData = await getAllBrand();
      setBrands(brandsData.data.data);
    };

    fetchCategories();
    fetchBrands();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    // if (
    //   !product.name ||
    //   !product.price ||
    //   !product.description ||
    //   !product.origin ||
    //   !product.IncenseGroup ||
    //   !brandId ||
    //   !categoryId ||
    //   images.length === 0
    // ) {
    //   console.log("Vui lòng điền đầy đủ thông tin sản phẩm.");
    //   return;
    // }

    // Check if price is a valid number
    if (isNaN(product.price) || product.price <= 0) {
      console.log("Giá sản phẩm không hợp lệ.");
      return;
    }

    // Create formData
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("description", product.description);
    formData.append("origin", product.origin);
    formData.append("IncenseGroup", product.IncenseGroup);
    images.forEach((image) => {
      if (image.file) {
        formData.append("images", image.file);
      }
    });
    deletedImageUrls.forEach((imageUrl) => {
      console.log(imageUrl);
      formData.append("dels", imageUrl.url);
    });
    formData.append("brandId", brandId);
    formData.append("categoryId", categoryId);

    // Call addproduct API
    try {
      await upproduct(formData, Item._id);
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
            setIsOpenAdd(false);
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
          <div style={{ width: "55%" }}>
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
          <div style={{ display: "flex", width: "100%", gap: "10px" }}>
            <div className="field__input-wrapper" style={{ width: "50%" }}>
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
            <div className="field__input-wrapper" style={{ width: "50%" }}>
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
          </div>
          <div className="field__input-wrapper">
            <label htmlFor="description" className="field__label">
              Mô tả
            </label>
            <textarea
              className="field__input"
              name="description"
              style={{ minHeight: "100px" }}
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
          <div className="cart1_button dmk">
            <div className="Cart1_item_rigth">
              <button type="submit">Lưu thay đổi</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateProduct;
