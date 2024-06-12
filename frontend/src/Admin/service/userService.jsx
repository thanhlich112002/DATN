import axios from "axios";
// const url = "https://datn-ten-zeta.vercel.app";

const url = "http://localhost:3000";

const getAllProducts = async (page) => {
  return axios.get(`${url}/api/products/getAllProducts?limit=7&page=${page}`);
};
const getAllOrders = async (page, status, start, end) => {
  const token = localStorage.getItem("token");
  return axios.get(
    `${url}/api/orders/getAllOrders?limit=10&page=${page}&sort=-dateOrdered&`,
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

// Phần dành cho danh mục

const getAllCategory = async (page) => {
  const token = localStorage.getItem("token");
  return axios.get(`${url}/api/categorys/getAllCategory?limit=7&page=${page}`, {
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
const updateCategory = async (data, id) => {
  const token = localStorage.getItem("token");
  return axios.put(`${url}/api/categorys/updateCategory/${id}`, data, {
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

// phần dánh cho Brand
const getAllBrands = async (page) => {
  const token = localStorage.getItem("token");
  return axios.get(`${url}/api/brands/getAllBrands?page=${page}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      ContentType: "multipart/form-data",
    },
  });
};
const createBrand = async (data) => {
  const token = localStorage.getItem("token");
  return axios.post(`${url}/api/brands/createBrand`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      ContentType: "multipart/form-data",
    },
  });
};
const updateBrand = async (data, id) => {
  const token = localStorage.getItem("token");
  return axios.put(`${url}/api/brands/updateBrand/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      ContentType: "multipart/form-data",
    },
  });
};
const getBrandById = async (data) => {
  const token = localStorage.getItem("token");
  return axios.get(`${url}/api/brands/getBrandById/${data}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      ContentType: "multipart/form-data",
    },
  });
};
////////////////////////////////////////////////////////////

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
const searchProducts = async (data, page) => {
  const token = localStorage.getItem("token");
  return axios.post(
    `${url}/api/products/searchProducts?limit=7&page=${page}`,
    { search: data },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        ContentType: "multipart/form-data",
      },
    }
  );
};
const searchBrands = async (data, page) => {
  const token = localStorage.getItem("token");
  return axios.post(
    `${url}/api/brands/seachBands?limit=7&page=${page}`,
    { nameBrand: data },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        ContentType: "multipart/form-data",
      },
    }
  );
};
const seachCategorys = async (data, page) => {
  const token = localStorage.getItem("token");
  return axios.post(
    `${url}/api/categorys/seachCategory?limit=7&page=${page}`,
    { nameCategory: data },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        ContentType: "multipart/form-data",
      },
    }
  );
};
export {
  seachCategorys,
  searchBrands,
  searchProducts,
  getBrandById,
  updateBrand,
  updateCategory,
  createBrand,
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
  getAllBrands,
  addproduct,
  deleteproduct,
  getAllOrders,
  getOrdersByOrderId,
  getStatistics,
};
