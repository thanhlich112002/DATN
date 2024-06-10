import axios from "axios";
const url = "http://localhost:3000";

const getAllProducts = async (page) => {
  return axios.get(`${url}/api/products/getAllProducts?limit=7&page=${page}`);
};
const getAllOrders = async (page) => {
  const token = localStorage.getItem("token");
  return axios.get(
    `${url}/api/orders/getAllOrders?limit=10&page=${page}&sort=-dateOrdered`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        ContentType: "multipart/form-data",
      },
    }
  );
};
const getOrdersByOrderId = async (id) => {
  const token = localStorage.getItem("token");
  return axios.get(`${url}/api/orders/getOrdersByOrderId${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      ContentType: "multipart/form-data",
    },
  });
};
const getAllUser = async (page) => {
  const token = localStorage.getItem("token");
  return axios.get(`${url}/api/user?page=${page}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      ContentType: "multipart/form-data",
    },
  });
};
const getProductsbyID = async (id) => {
  return axios.get(`${url}/api/products/getProductsbyID/${id}`);
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
const quantity = async (page) => {
  const token = localStorage.getItem("token");
  return axios.get(`${url}/api/admin/quantity/${page}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      ContentType: "multipart/form-data",
    },
  });
};
const getStatistics = async (page) => {
  const token = localStorage.getItem("token");
  return axios.get(`${url}/api/admin/getStatistics`, {
    headers: {
      Authorization: `Bearer ${token}`,
      ContentType: "multipart/form-data",
    },
  });
};
const upStatus = async (data, id) => {
  const token = localStorage.getItem("token");
  return axios.post(`${url}/api/admin/upStatus/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      ContentType: "multipart/form-data",
    },
  });
};
const getAllVouchers = async () => {
  const token = localStorage.getItem("token");
  return axios.get(`${url}/api/vouchers/getAllVouchers`, {
    headers: {
      Authorization: `Bearer ${token}`,
      ContentType: "multipart/form-data",
    },
  });
};
const createVoucher = async (data) => {
  const token = localStorage.getItem("token");
  return axios.post(`${url}/api/vouchers/createVoucher`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      ContentType: "multipart/form-data",
    },
  });
};
const getCategoryById = async (data) => {
  const token = localStorage.getItem("token");
  return axios.get(`${url}/api/categorys/getCategoryById/${data}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      ContentType: "multipart/form-data",
    },
  });
};
const updateCategory = async (data, id) => {
  const token = localStorage.getItem("token");
  return axios.put(`${url}/api/categorys/updateCategory/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      ContentType: "multipart/form-data",
    },
  });
};
export {
  updateCategory,
  getCategoryById,
  createVoucher,
  getAllVouchers,
  upStatus,
  quantity,
  getProductsbyID,
  createCategory,
  upproduct,
  getAllProducts,
  getAllUser,
  getAllCategory,
  getAllBrand,
  addproduct,
  deleteproduct,
  getAllOrders,
  getOrdersByOrderId,
  getStatistics,
};
