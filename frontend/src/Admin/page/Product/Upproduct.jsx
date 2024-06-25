import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faShoppingBag,
  faStar,
  faHeart,
  faBookmark,
} from "@fortawesome/free-solid-svg-icons";
import {
  getAllCategory,
  getAllBrands,
  upproduct,
  getProductsbyID,
  getAllComment,
} from "../../service/userService";
import "./style.css";
import Image from "./image";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Card from "../Dashboard/card";
import RatingStars from "./RatingStars";

function AddCategory() {
  const { id } = useParams();
  const [item, setItem] = useState([]);
  const [images, setImages] = useState([]);
  const [brands, setBrands] = useState([]);
  const [listComment, setListComment] = useState(null);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState(null);
  const [deletedImageUrls, setDeletedImageUrls] = useState([]);
  const [brandId, setBrandId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [product, setProduct] = useState({});
  const fetchComment = async () => {
    try {
      const Comment = await getAllComment(id);
      setListComment(Comment.data.data);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };
  useEffect(() => {
    fetchComment();
  }, [id]);
  const navigate = useNavigate();

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
        isAvailable: productData.data.data[0]?.isAvailable,
        isOutofOrder: productData.data.data[0]?.isOutofOrder,
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
      const categoriesData = await getAllCategory("", 100);
      setCategories(categoriesData.data.data);
      if (categoriesData.data.data.length > 0) {
        setCategoryId(categoriesData.data.data[0]._id);
      }
    };

    const fetchBrands = async () => {
      const brandsData = await getAllBrands("", 100);
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
      formData.append("isAvailable", product.isAvailable);
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
    formData.append("isAvailable", product.isAvailable);
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
      navigate("/admin/product");
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
              className="addbut"
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

          <div className="_card-body BrP5">
            {product.isOutofOrder ? (
              <>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "10px",
                    fontSize: "20px",
                    color: "red",
                  }}
                >
                  Lưu ý :Sản phẩm này đang hết hàng
                </div>
              </>
            ) : (
              <></>
            )}
            <div></div>
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
                  <td className="column-1">Trạng thái</td>
                  <td className="column-2">
                    <select
                      name="isAvailable"
                      id="isAvailable"
                      className="field__input"
                      value={product.isAvailable}
                      onChange={handleChange}
                    >
                      <option value={true}>Đang bán</option>
                      <option value={false}>Ngừng bán</option>
                    </select>
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
          <div className="comments-section">
            <h2 className="comments-title">Đánh giá sản phẩm</h2>
            <div>
              {listComment &&
                listComment.map((comment, key) => {
                  return (
                    <div className="comment" key={key}>
                      <div className="comment-header">
                        <img
                          className="comment-avatar"
                          src="https://scontent.fdad1-4.fna.fbcdn.net/v/t39.30808-1/341567992_189194443477447_7522191387098263235_n.jpg?stp=cp6_dst-jpg_p200x200&_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeEarTZE1aOvAEMKCFgm0iyGwIk906XKCkTAiT3TpcoKRF6DzDf_rTfilFbZ4fh7aLieJ-YbdEzNf9h1RH7jnDvV&_nc_ohc=9wgj3DPaut0Q7kNvgHTlYj1&_nc_ht=scontent.fdad1-4.fna&oh=00_AYCWXjvjWodp66otNOxgqb4FY1ZCXIeiQMDsaykFLSwuZg&oe=666FD5B9"
                          alt="User1 Avatar"
                        />
                      </div>
                      <div className="comment-body">
                        <div className="comment-info">
                          <span className="comment-user">
                            {comment.user.lastName +
                              " " +
                              comment.user.firstName}
                          </span>
                          <span className="comment-date">
                            {new Date(comment.createdAt).toLocaleString()}
                          </span>
                        </div>
                        <RatingStars num={comment.rating} />
                        <p>{comment.content}</p>
                        {comment.images ? (
                          <img
                            className="comment-img"
                            src={comment.images}
                            alt="Comment Image"
                          />
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddCategory;
