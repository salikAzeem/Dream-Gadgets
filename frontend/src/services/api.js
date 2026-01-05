import axios from "axios";

const API = axios.create({
  baseURL: "/api", // 👈 VERY IMPORTANT
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("adminToken");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
