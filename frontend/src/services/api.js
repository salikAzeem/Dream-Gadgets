import axios from "axios";

const API = axios.create({
  baseURL: "https://dream-gadgets-1.onrender.com/api",
});


// 🔥 THIS IS THE MOST IMPORTANT PART
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("adminToken");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
