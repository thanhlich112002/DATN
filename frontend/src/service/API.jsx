import axios from "axios";
//
const url = "http://localhost:3000";

//Auth

const loginAPI = async (formData) => {
  return axios.post(`${url}/api/auths/login`, formData);
};
const logoutAPI = async () => {
  return axios.post(`${url}/api/auths/logout`);
};
export { loginAPI, logoutAPI };
