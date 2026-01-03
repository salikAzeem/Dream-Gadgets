// admin/AdminLogin.jsx
import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    const res = await API.post("/admin/login", { email, password });
    localStorage.setItem("adminToken", res.data.token);
    navigate("/admin/dashboard");
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-6 w-80 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Admin Login</h2>

        <input
          className="border p-2 w-full mb-3"
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="border p-2 w-full mb-3"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />

        <button
          onClick={login}
          className="bg-black text-white w-full py-2 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
}
