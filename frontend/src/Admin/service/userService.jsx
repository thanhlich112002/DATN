import axios from "axios";
const url = "http://localhost:3000";

const getAllProducts = async (page) => {
  return axios.get(`${url}/api/products/getAllProducts?limit=7&page=${page}`);
};
// Order
const getAllUser = async (page) => {
  const token = localStorage.getItem("token");
  return axios.get(`${url}/api/user?page=${page}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      ContentType: "multipart/form-data",
    },
  });
};
const addproduct = async (formData) => {
  const token = localStorage.getItem("token");
  return axios.post(`${url}/api/products/addproduct`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      ContentType: "multipart/form-data",
    },
  });
};

const deleteproduct = async (id) => {
  const token = localStorage.getItem("token");
  return axios.delete(`${url}/api/products/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      ContentType: "multipart/form-data",
    },
  });
};

const upproduct = async (formData, id) => {
  const token = localStorage.getItem("token");
  return axios.put(`${url}/api/products/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      ContentType: "multipart/form-data",
    },
  });
};

const getAllCategory = async (page) => {
  const token = localStorage.getItem("token");
  return axios.get(`${url}/api/categorys/getAllCategory`, {
    headers: {
      Authorization: `Bearer ${token}`,
      ContentType: "multipart/form-data",
    },
  });
};
const createCategory = async (data) => {
  const token = localStorage.getItem("token");
  return axios.post(`${url}/api/categorys/createCategory`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      ContentType: "multipart/form-data",
    },
  });
};
const getAllBrand = async (page) => {
  const token = localStorage.getItem("token");
  return axios.get(`${url}/api/brands/getAllBrand`, {
    headers: {
      Authorization: `Bearer ${token}`,
      ContentType: "multipart/form-data",
    },
  });
};

export {
  createCategory,
  upproduct,
  getAllProducts,
  getAllUser,
  getAllCategory,
  getAllBrand,
  addproduct,
  deleteproduct,
};
