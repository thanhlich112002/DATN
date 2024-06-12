import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faShoppingBag,
  faStar,
  faHeart,
  faBookmark,
} from "@fortawesome/free-solid-svg-icons"; // Sửa icon của thẻ Card
import {
  getAllCategory,
  getAllBrands,
  upproduct,
  getProductsbyID,
} from "../../service/userService";
import "./style.css";
import Image from "./image";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Card from "../Dashboard/card";

function AddCategory() {
  const [item, setItem] = useState([]);
  const [images, setImages] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState(null);
  const [deletedImageUrls, setDeletedImageUrls] = useState([]);
  const [brandId, setBrandId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [product, setProduct] = useState({});

  const navigate = useNavigate();
  const { id } = useParams();
  const fetchProduct = async () => {
    try {
      const productData = await getProductsbyID(id);
      console.log(productData.data.data[0]);
      setItem(productData.data.favorites);
      const newImages = productData.data.data[0]?.images.map((image) => ({
        url: image,
      }));
      setImages(newImages);
      setProduct({
        name: productData.data.data[0]?.name,
        price: productData.data.data[0]?.price,
        description: productData.data.data[0]?.description,
        origin: productData.data.data[0]?.origin,
        IncenseGroup: productData.data.data[0]?.IncenseGroup,
        inputprice: productData.data.data[0]?.inputprice,
        quantity: productData.data.data[0]?.quantity,
        productPurchases: productData.data.data[0]?.productPurchases,
        ratingsAverage: productData.data.data[0]?.ratingsAverage,
      });
      setBrandId(productData.data.data[0].Brand._id);
      setCategoryId(productData.data.data[0].Category._id);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };
  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleBackToCategoryList = () => {
    navigate("/admin/product");
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesData = await getAllCategory();
      setCategories(categoriesData.data.data);
      if (categoriesData.data.data.length > 0) {
        setCategoryId(categoriesData.data.data[0]._id);
      }
    };

    const fetchBrands = async () => {
      const brandsData = await getAllBrands();
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
    if (isNaN(product.price) || product.price <= 0) {
      toast.error("Giá sản phẩm không hợp lệ.");
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
    try {
      await upproduct(formData, id);
      setProduct({
        name: "",
        price: "",
        description: "",
        origin: "",
        IncenseGroup: "",
      });
      setImages([]);
      setDeletedImageUrls([]);
      toast.success("Cập nhật thành công!");
      navigate("/admin/tableproduct");
    } catch (error) {
      console.log("Đã xảy ra lỗi khi thêm sản phẩm:", error);
      toast.error("Đã xảy ra lỗi khi thêm sản phẩm!");
    }
  };

  return (
    <div>
      <div className="projects">
        <div className="_card">
          <div className="card-header">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                borderRadius: "5px",
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: "100px",
                  height: "100px",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FontAwesomeIcon
                  icon={faBookmark}
                  fontSize={70}
                  color="#C0C0C0"
                />
              </div>
              <span>Thông tin sản phẩm</span>
            </div>
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
              Qua về sản phẩm
            </button>
          </div>
          <div className="dashboard_cards">
            <Card
              value={product.productPurchases}
              title={"Sản phẩm đã bán"}
              icon={faShoppingBag}
              cln={"bcl1"}
            />
            <Card
              value={product.quantity}
              title={"Sản phẩm còn lại"}
              icon={faShoppingBag}
              cln={"bcl2"}
            />
            <Card
              value={product.ratingsAverage}
              title={"Đánh giá"}
              icon={faStar}
              cln={"bcl3"}
            />
            <Card
              value={item}
              title={"Yêu thích"}
              icon={faHeart}
              cln={"bcl4"}
            />
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
                      {brands?.map((brand) => (
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
                      {categories?.map((category) => (
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
