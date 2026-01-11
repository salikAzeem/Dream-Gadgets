import { useEffect, useState } from "react";
import API from "../services/api";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/products")
      .then(res => setProducts(res.data))
      .finally(() => setLoading(false));
  }, []);

  const remove = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    await API.delete(`/products/${id}`);
    setProducts(products.filter(p => p._id !== id));
  };

  if (loading) {
    return <p className="p-6">Loading products...</p>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        📦 Product List
      </h2>

      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-4 text-left">Image</th>
              <th className="p-4 text-left">Product</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-6 text-center text-gray-500">
                  No products found
                </td>
              </tr>
            ) : (
              products.map((p) => (
                <tr
                  key={p._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  {/* Image */}
                  <td className="p-4">
                    <img
  src={p.image || "/no-image.png"}
  alt={p.name}
  onError={(e) => (e.target.src = "/no-image.png")}
  style={{
    width: "100px",
    height: "100px",
    objectFit: "contain",
    backgroundColor: "#fff",
    padding: "4px",
    border: "1px solid #e5e7eb",
    borderRadius: "6px",
  }}
/>

                  </td>

                  {/* Name */}
                  <td className="p-4">
                    <p className="font-semibold text-gray-800">
                      {p.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      ID: {p._id.slice(-6)}
                    </p>
                  </td>

                  {/* Category */}
                  <td className="p-4">
                    <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-700">
                      {p.category}
                    </span>
                  </td>

                  {/* Price */}
                  <td className="p-4 font-semibold text-green-600">
                    ₹{p.price}
                  </td>

                  {/* Action */}
                  <td className="p-4 text-center">
                    <button
                      onClick={() => remove(p._id)}
                      className="text-red-600 hover:underline font-semibold"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
