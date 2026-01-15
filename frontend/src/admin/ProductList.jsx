import { useEffect, useState } from "react";
import API from "../services/api";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Edit states
  const [editingProduct, setEditingProduct] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    image: "",
  });

  // 🔹 Fetch products
  useEffect(() => {
    API.get("/products")
      .then((res) => setProducts(res.data))
      .finally(() => setLoading(false));
  }, []);

  // 🔹 Delete product
  const remove = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    await API.delete(`/products/${id}`);
    setProducts(products.filter((p) => p._id !== id));
  };

  // 🔹 Open edit modal
  const openEdit = (product) => {
    setEditingProduct(product);
    setEditForm({
      name: product.name ?? "",
      price: product.price ?? "",
      category: product.category ?? "",
      description: product.description ?? "",
      image: product.image ?? "",
    });
  };

  // 🔹 Update product (ANY field)
  const updateProduct = async () => {
    const payload = {};

    if (editForm.name !== editingProduct.name)
      payload.name = editForm.name;

    if (String(editForm.price) !== String(editingProduct.price))
      payload.price = editForm.price;

    if (editForm.category !== editingProduct.category)
      payload.category = editForm.category;

    if (editForm.description !== editingProduct.description)
      payload.description = editForm.description;

    if (editForm.image !== editingProduct.image)
      payload.image = editForm.image;

    if (Object.keys(payload).length === 0) {
      alert("No changes made");
      return;
    }

    const res = await API.put(
      `/products/${editingProduct._id}`,
      payload
    );

    setProducts(
      products.map((p) =>
        p._id === editingProduct._id ? res.data : p
      )
    );

    setEditingProduct(null);
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
                <tr key={p._id} className="border-t hover:bg-gray-50">
                  <td className="p-4">
                    <img
                      src={p.image || "/no-image.png"}
                      alt={p.name}
                      onError={(e) => (e.target.src = "/no-image.png")}
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "contain",
                        border: "1px solid #e5e7eb",
                        borderRadius: "6px",
                        padding: "4px",
                        backgroundColor: "#fff",
                      }}
                    />
                  </td>

                  <td className="p-4">
                    <p className="font-semibold text-gray-800">{p.name}</p>
                    <p className="text-xs text-gray-500">
                      ID: {p._id.slice(-6)}
                    </p>
                  </td>

                  <td className="p-4">
                    <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-700">
                      {p.category}
                    </span>
                  </td>

                  <td className="p-4 font-semibold text-green-600">
                    ₹{p.price}
                  </td>

                  <td className="p-4 text-center space-x-3">
                    <button
                      onClick={() => openEdit(p)}
                      className="text-blue-600 hover:underline font-semibold"
                    >
                      Edit
                    </button>

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

      {/* 🔹 EDIT MODAL */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg">
            <h3 className="text-xl font-bold mb-4">Edit Product</h3>

            <input
              className="w-full border p-2 mb-3 rounded"
              placeholder="Product Name"
              value={editForm.name}
              onChange={(e) =>
                setEditForm({ ...editForm, name: e.target.value })
              }
            />

            <input
              type="number"
              className="w-full border p-2 mb-3 rounded"
              placeholder="Price"
              value={editForm.price}
              onChange={(e) =>
                setEditForm({ ...editForm, price: e.target.value })
              }
            />

            <input
              className="w-full border p-2 mb-3 rounded"
              placeholder="Category"
              value={editForm.category}
              onChange={(e) =>
                setEditForm({ ...editForm, category: e.target.value })
              }
            />

            <textarea
              className="w-full border p-2 mb-3 rounded"
              placeholder="Description"
              rows={3}
              value={editForm.description}
              onChange={(e) =>
                setEditForm({ ...editForm, description: e.target.value })
              }
            />

            <input
              className="w-full border p-2 mb-4 rounded"
              placeholder="Image URL"
              value={editForm.image}
              onChange={(e) =>
                setEditForm({ ...editForm, image: e.target.value })
              }
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setEditingProduct(null)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={updateProduct}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Update Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
