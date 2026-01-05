import axios from "axios";

const API = axios.create({
  baseURL: "https://dream-gadgets-1.onrender.com/api"
});

// attach token
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("adminToken");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
