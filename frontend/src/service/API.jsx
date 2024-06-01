import axios from "axios";
import Category from "../Components/Category/category";

//
const url = "http://localhost:3000";

const loginAPI = async (formData) => {
  return axios.post(`${url}/api/auths/login`, formData);
};
const SingupAPI = async (formData) => {
  return axios.post(`${url}/api/users/SingUp`, formData);
};
const logoutAPI = async () => {
  return axios.post(`${url}/api/auths/logout`);
};

//Auth
const token = localStorage.getItem("token");
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json", // Optional: include if your API expects this header
  },
};
const GetUserByToken = async () => {
  return axios.get(`${url}/api/auths/getUser`, config);
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
const getAllBrand = async () => {
  return axios.get(`${url}/api/brands/getAllBrand`);
};
const seachBrands = async (name) => {
  return axios.post(`${url}/api/brands/seachBands`, {
    nameBrand: name,
  });
};
const getOrdersByUserId = async (id) => {
  return axios.get(`${url}/api/orders/getOrdersByUserId/${id}`, {});
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

export {
  changepassword,
  getOrdersByUserId,
  loginAPI,
  logoutAPI,
  GetUserByToken,
  getAllProductsbyCat,
  Getallcategory,
  getAllProducts,
  getAllBrand,
  seachBrands,
  searchProducts,
  getProductsbyID,
  SingupAPI,
};
