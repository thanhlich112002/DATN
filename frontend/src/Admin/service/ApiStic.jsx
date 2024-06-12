import axios from "axios";
// const url = "https://datn-ten-zeta.vercel.app";
const url = "http://localhost:3000";
const getOrderCount = async (time) => {
  const token = localStorage.getItem("token");
  return axios.get(`${url}/api/admin/getOrderCount/${time}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      ContentType: "multipart/form-data",
    },
  });
};
const getOrderRevenueByCategory = async (time) => {
  const token = localStorage.getItem("token");
  return axios.get(`${url}/api/admin/getOrderRevenueByCategory/${time}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      ContentType: "multipart/form-data",
    },
  });
};
const getTopSale = async (time) => {
  const token = localStorage.getItem("token");
  return axios.get(`${url}/api/admin/getTopSale/${time}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      ContentType: "multipart/form-data",
    },
  });
};
const getOrderRevenueByBrand = async (time) => {
  const token = localStorage.getItem("token");
  return axios.get(`${url}/api/admin/getOrderRevenueByBrand/${time}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      ContentType: "multipart/form-data",
    },
  });
};
export {
  getOrderCount,
  getOrderRevenueByCategory,
  getTopSale,
  getOrderRevenueByBrand,
};
