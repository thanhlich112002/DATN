import axios from "axios";
import Category from "../Components/Category/category";

//
// const url = "https://datn-ten-zeta.vercel.app";
const url = "http://localhost:3000";

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
  return axios.get(`${url}/api/categorys/getAllCategory`);
};
const getAllBrands = async () => {
  return axios.get(`${url}/api/brands/getAllBrands`);
};
const seachBrands = async (name) => {
  return axios.post(`${url}/api/brands/seachBands`, {
    nameBrand: name,
  });
};
const getOrdersByUserId = async (id) => {
  return axios.get(
    `${url}/api/orders/getOrdersByUserId/${id}?limit=100&sort=-dateOrdered`,
    {}
  );
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
    notes: product.specialRequest,
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
  return await axios.get(`${url}/api/vouchers/getAllVouchers`, config);
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
const getVouchersbyUser = async (data) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  return await axios.post(
    `${url}/api/vouchers/getVouchersbyUser`,
    data,
    config
  );
};
export {
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
