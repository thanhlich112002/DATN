import axios from "axios";
const url = "https://datn-ten-zeta.vercel.app";

// const url = "http://localhost:3000";

const getAllProducts = async (page, status, status1) => {
  return axios.get(
    `${url}/api/products/getAllProducts?limit=7&page=${page}&isAvailable=${status}&isOutofOrder=${status1}`
  );
};
const getStatisticsOrders = async (start, end) => {
  const token = localStorage.getItem("token");
  const url1 = `${url}/api/orders/getStatisticsOrders`;
  const params = {
    start: start,
    end: end,
  };
  try {
    const response = await axios.get(url1, {
      params: params,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách đơn hàng:", error);
    throw error;
  }
};
const getAllOrders = async (page, status, start, end, name) => {
  const token = localStorage.getItem("token");
  const url1 = `${url}/api/orders/getAllOrders`;
  const params = {
    limit: 7,
    page: page,
    sort: "-dateOrdered",
    start: start,
    end: end,
    name: name,
  };
  if (status !== "all") {
    params.status = status;
  }

  try {
    const response = await axios.get(url1, {
      params: params,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách đơn hàng:", error);
    throw error;
  }
};
const getOrdersByOrderId = async (id) => {
  const token = localStorage.getItem("token");
  return axios.get(`${url}/api/orders/getOrdersByOrderId/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      ContentType: "multipart/form-data",
    },
  });
};
const getAllUser = async (page, status, role) => {
  const token = localStorage.getItem("token");
  console.log(status);
  return axios.post(
    `${url}/api/admin/getAllUser?page=${page}`,
    { status: status, role: role },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};
const getStatisticsUser = async (page, status, role) => {
  const token = localStorage.getItem("token");
  console.log(status);
  return axios.get(`${url}/api/admin/getStatisticsUser?page=${page}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
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

const getAllCategory = async (page, limit) => {
  const token = localStorage.getItem("token");
  return axios.get(
    `${url}/api/categorys/getAllCategory?limit=${limit}&page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        ContentType: "multipart/form-data",
      },
    }
  );
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
const getAllBrands = async (page, limit) => {
  const token = localStorage.getItem("token");
  return axios.get(
    `${url}/api/brands/getAllBrands?limit=${limit}page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        ContentType: "multipart/form-data",
      },
    }
  );
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
const getAllVouchers = async (page, status) => {
  const token = localStorage.getItem("token");
  return axios.get(
    `${url}/api/vouchers/getAllVouchers?page=${page}&status=${status}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        ContentType: "multipart/form-data",
      },
    }
  );
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
const updateVoucher = async (data, id) => {
  const token = localStorage.getItem("token");
  return axios.post(`${url}/api/vouchers/updateVoucher/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      ContentType: "multipart/form-data",
    },
  });
};
const getAllSidebar = async (page, status) => {
  const token = localStorage.getItem("token");
  return axios.get(`${url}/api/sidebar/getAllSidebar?page=${page}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      ContentType: "multipart/form-data",
    },
  });
};
const createSidebar = async (data) => {
  const token = localStorage.getItem("token");
  return axios.post(`${url}/api/sidebar/createSidebar`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      ContentType: "multipart/form-data",
    },
  });
};
const updateSidebar = async (id) => {
  const token = localStorage.getItem("token");
  return axios.put(
    `${url}/api/sidebar/updateSidebar/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
        ContentType: "multipart/form-data",
      },
    }
  );
};
const deleteVoucher = async (req, res, next) => {};

const searchProducts = async (data, page, status, status1) => {
  const token = localStorage.getItem("token");
  return axios.post(
    `${url}/api/products/searchProducts?limit=7&page=${page}&isAvailable=${status}&isOutofOrder=${status1}`,
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
const searchCategorys = async (data, page) => {
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
const getStatisticsProduct = async () => {
  const token = localStorage.getItem("token");
  return axios.get(`${url}/api/admin/getStatisticsProduct`, {
    headers: {
      Authorization: `Bearer ${token}`,
      ContentType: "multipart/form-data",
    },
  });
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
const getStatisticsCategory = async (id) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  return await axios.get(`${url}/api/admin/getStatisticsCategory`, config);
};
const getStatisticsCategorybyId = async (id) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  return await axios.get(
    `${url}/api/admin/getStatisticsCategorybyId/${id}`,
    config
  );
};

const getStatisticsBrand = async (id) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  return await axios.get(`${url}/api/admin/getStatisticsBrand`, config);
};
const getStatisticsBrandbyId = async (id) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  return await axios.get(
    `${url}/api/admin/getStatisticsBrandbyId/${id}`,
    config
  );
};
const DElUser = async (id) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  return await axios.delete(`${url}/api/admin/DElUser/${id}`, config);
};
const getAllNotifications = async () => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  return await axios.get(`${url}/api/notification/getAllNotifications`, config);
};
const isSend = async (id) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  return axios.get(`${url}/api/notification/isSend/${id}`, config);
};
export {
  createSidebar,
  updateSidebar,
  getAllSidebar,
  isSend,
  getAllNotifications,
  updateVoucher,
  DElUser,
  deleteVoucher,
  getStatisticsUser,
  getStatisticsBrandbyId,
  getStatisticsCategorybyId,
  getStatisticsBrand,
  getStatisticsCategory,
  getAllComment,
  getStatisticsProduct,
  searchCategorys,
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
  getStatisticsOrders,
};
