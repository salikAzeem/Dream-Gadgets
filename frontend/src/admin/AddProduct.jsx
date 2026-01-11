// admin/AddProduct.jsx
import { useState } from "react";
import API from "../services/api";

useEffect(() => {
  const token = localStorage.getItem("adminToken");
  if (!token) {
    alert("Please login as admin");
    navigate("/admin/login");
  }
}, []);

export default function AddProduct() {
  const [data, setData] = useState({});
  const [image, setImage] = useState(null);

  const submit = async () => {
    const formData = new FormData();
    Object.keys(data).forEach(key => formData.append(key, data[key]));
    formData.append("image", image);

    await API.post("/products", formData);
    alert("Product Added!");
  };

  return (
    <div className="p-6 max-w-xl">
      <h2 className="text-xl font-bold mb-4">Add New Product</h2>

      <input className="border p-2 w-full mb-2"
        placeholder="Product Name"
        onChange={e => setData({...data, name: e.target.value})}
      />

      <input className="border p-2 w-full mb-2"
        placeholder="Price"
        onChange={e => setData({...data, price: e.target.value})}
      />

      <input className="border p-2 w-full mb-2"
        placeholder="Category (Cover, Earbuds...)"
        onChange={e => setData({...data, category: e.target.value})}
      />

      <textarea className="border p-2 w-full mb-2"
        placeholder="Description"
        onChange={e => setData({...data, description: e.target.value})}
      />

      <input type="file" onChange={e => setImage(e.target.files[0])} />

      <button
        onClick={submit}
        className="bg-black text-white px-4 py-2 mt-4 rounded"
      >
        Add Product
      </button>
    </div>
  );
}
