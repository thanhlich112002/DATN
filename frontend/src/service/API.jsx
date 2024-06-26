import axios from "axios";
import Category from "../Components/Category/category";

//
const url = "https://datn-ten-zeta.vercel.app";
// const url = "http://localhost:3000";

const loginAPI = async (formData) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  return axios.post(`${url}/api/auths/login`, formData);
};
const addContact = async (data) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  return await axios.post(`${url}/api/users/addContact`, data, config);
};

const defaultContact = async (id) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  return await axios.post(`${url}/api/users/defaultContact/${id}`, {}, config);
};
const delContact = async (id) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  return await axios.delete(`${url}/api/users/delContact/${id}`, config);
};

const getUser = async () => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  return axios.get(`${url}/api/users/getUser`, config);
};
const SingupAPI = async (formData) => {
  return axios.post(`${url}/api/users/SingUp`, formData);
};
const logoutAPI = async () => {
  return axios.post(`${url}/api/auths/logout`);
};

//Auth

const GetUserByToken = async () => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  return axios.get(`${url}/api/auths/getUser`, config);
};
const addFavorite = async (id) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  return await axios.post(`${url}/api/favorites/addFavorite/${id}`, {}, config);
};
const getFavorite = async () => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  return await axios.get(`${url}/api/favorites/GetFavorites`, config);
};

const createComment = async (Form, id) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  return await axios.post(
    `${url}/api/comments/createComment/${id}`,
    Form,
    config
  );
};
const getAllComment = async (id) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  return await axios.get(`${url}/api/comments/getAllComment/${id}`, config);
};
const updateUser = async (data) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  return await axios.post(`${url}/api/users/updateUser`, data, config);
};

const getAllProductsbyCat = async (name, limit, page) => {
  return axios.post(
    `${url}/api/products/getAllProductsbyCat?limit=${limit},page=${page}`,
    {
      Category: name,
    }
  );
};
const getAllProducts = async (name) => {
  return axios.get(`${url}/api/products/getAllProducts?limit=100`, {
    Category: name,
  });
};
const getProductsbyID = async (id) => {
  return axios.get(`${url}/api/products/getProductsbyID/${id}`);
};
const searchProducts = async (object) => {
  return axios.post(`${url}/api/products/searchProducts?limit=100`, object);
};

const Getallcategory = async () => {
  return axios.get(`${url}/api/categorys/getAllCategory?limit=100`);
};
const getAllBrands = async () => {
  return axios.get(`${url}/api/brands/getAllBrands?limit=100`);
};
const seachBrands = async (name) => {
  return axios.post(`${url}/api/brands/seachBands?limit=100`, {
    nameBrand: name,
  });
};
const getOrdersByUserId = async (
  id,
  currentPage,
  status,
  startDate,
  endDate
) => {
  const token = localStorage.getItem("token");
  const params = {
    userId: id,
    limit: 7,
    page: currentPage,
    sort: "-dateOrdered",
    start: startDate,
    end: endDate,
  };
  if (status !== "all") {
    params.status = status;
  }
  return axios.get(`${url}/api/orders/getOrdersByUserId`, {
    params,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

const changepassword = async (
  email,
  oldPassword,
  newPassword,
  confirmPassword
) => {
  return await axios.post(`${url}/api/auths/changePassword/${email}`, {
    newPassword: newPassword,
    comfirmPassword: confirmPassword,
    oldPassword: oldPassword,
  });
};

const createOrder = async (totalPrice, shipCost, contactId, voucherID) => {
  console.log("creteqwewqewqe");
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  const cart = JSON.parse(localStorage.getItem("cartItems"));
  const products = cart.map((product) => ({
    quantity: product.quantity,
    price: product.price,
    product: product._id,
  }));
  const orderData = {
    cart: products,
    contact: contactId,
    totalPrice: totalPrice,
    shipCost: shipCost,
    voucherID: voucherID ? voucherID : null,
  };
  return await axios.post(`${url}/api/orders/createOrder`, orderData, config);
};
const createPayment = async (query) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  return await axios.get(
    `${url}/api/orders/after-checkout/payment${query}`,
    config
  );
};
const getVouchersbyCode = async (code) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  return await axios.get(
    `${url}/api/vouchers/getVouchersbyCode/${code}`,
    config
  );
};
const chekcomments = async (id) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  return await axios.get(`${url}/api/orders/chekcomments/${id}`, config);
};
const viewsProduct = async (id) => {
  return await axios.post(`${url}/api/products/viewsProduct/${id}`);
};
const getAllVouchers = async (id) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  return await axios.get(
    `${url}/api/vouchers/getAllVouchers?status=true`,
    config
  );
};
const addVouchers = async (id) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  return await axios.post(`${url}/api/vouchers/addVouchers/${id}`, {}, config);
};
const getVouchersbyUser = async () => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  return await axios.post(`${url}/api/vouchers/getVouchersbyUser`, {}, config);
};
const ReturnOrder = async (id) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  return await axios.get(`${url}/api/orders/ReturnOrder/${id}`, config);
};
const cancelOrder = async (id) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  return await axios.get(`${url}/api/orders/cancelOrder/${id}`, config);
};
const getAllSidebar = async (id) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  return await axios.get(`${url}/api/sidebar/getAllSidebar`, config);
};
const forgetPassword = async (gmail) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  return await axios.post(
    `${url}/api/auths/forgetPassword/${gmail}`,
    {},
    config
  );
};
const verifyToken = async (gmail, signUpToke) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  return await axios.post(
    `${url}/api/auths/verifyToken/${gmail}`,
    { signUpToken: signUpToke },
    config
  );
};
const resetPassword = async (gmail, data) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  return await axios.post(
    `${url}/api/auths/resetPassword/${gmail}`,
    data,
    config
  );
};

export {
  resetPassword,
  verifyToken,
  forgetPassword,
  getAllSidebar,
  cancelOrder,
  ReturnOrder,
  getVouchersbyUser,
  getAllVouchers,
  addVouchers,
  viewsProduct,
  chekcomments,
  getVouchersbyCode,
  createPayment,
  createOrder,
  defaultContact,
  delContact,
  getUser,
  createComment,
  getAllComment,
  getFavorite,
  addFavorite,
  changepassword,
  getOrdersByUserId,
  loginAPI,
  logoutAPI,
  GetUserByToken,
  getAllProductsbyCat,
  Getallcategory,
  getAllProducts,
  getAllBrands,
  seachBrands,
  searchProducts,
  getProductsbyID,
  SingupAPI,
  updateUser,
  addContact,
};
