// admin/ProductList.jsx
import { useEffect, useState } from "react";
import API from "../services/api";

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    API.get("/products").then(res => setProducts(res.data));
  }, []);

  const remove = async (id) => {
    await API.delete(`/products/${id}`);
    setProducts(products.filter(p => p._id !== id));
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">All Products</h2>

      {products.map(p => (
        <div key={p._id} className="bg-white p-4 mb-3 flex justify-between">
          <div>
            <h3 className="font-bold">{p.name}</h3>
            <p>₹{p.price}</p>
          </div>
          <button
            onClick={() => remove(p._id)}
            className="text-red-500"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
