import { useState } from "react";
import API from "../services/api";

const CATEGORIES = [
  "Phone",
  "Phone Cover",
  "Earbuds",
  "Smart Watch",
  "Charger",
  "Cable",
  "Screen Guard",
  "Other",
];

export default function AddProduct() {
  const [data, setData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const submit = async () => {
    if (!data.name || !data.price || !data.category || !image) {
      alert("Please fill all required fields");
      return;
    }

    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
    formData.append("image", image);

    try {
      setLoading(true);
      await API.post("/products", formData);
      alert("✅ Product Added Successfully!");

      setData({
        name: "",
        price: "",
        category: "",
        description: "",
      });
      setImage(null);
      setPreview(null);
    } catch (err) {
      console.error(err);
      alert("❌ Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        ➕ Add New Product
      </h2>

      {/* TABLE STYLE FORM */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl">
        <table className="w-full text-sm">
          <tbody>
            {/* Name */}
            <tr className="border-b">
              <td className="p-4 font-semibold bg-gray-50 w-1/4">
                Product Name
              </td>
              <td className="p-4">
                <input
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                  className="border p-2 w-full rounded focus:ring-2 focus:ring-yellow-400 outline-none"
                  placeholder="iPhone 15 Cover"
                />
              </td>
            </tr>

            {/* Price */}
            <tr className="border-b">
              <td className="p-4 font-semibold bg-gray-50">
                Price (₹)
              </td>
              <td className="p-4">
                <input
                  name="price"
                  value={data.price}
                  onChange={handleChange}
                  className="border p-2 w-full rounded focus:ring-2 focus:ring-yellow-400 outline-none"
                  placeholder="499"
                />
              </td>
            </tr>

            {/* Category */}
            <tr className="border-b">
              <td className="p-4 font-semibold bg-gray-50">
                Category
              </td>
              <td className="p-4">
                <select
                  name="category"
                  value={data.category}
                  onChange={handleChange}
                  className="border p-2 w-full rounded focus:ring-2 focus:ring-yellow-400 outline-none"
                >
                  <option value="">Select Category</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </td>
            </tr>

            {/* Description */}
            <tr className="border-b">
              <td className="p-4 font-semibold bg-gray-50">
                Description
              </td>
              <td className="p-4">
                <textarea
                  name="description"
                  value={data.description}
                  onChange={handleChange}
                  rows={3}
                  className="border p-2 w-full rounded focus:ring-2 focus:ring-yellow-400 outline-none"
                  placeholder="Premium silicone cover with shock protection"
                />
              </td>
            </tr>

            {/* Image */}
            <tr>
              <td className="p-4 font-semibold bg-gray-50">
                Product Image
              </td>
              <td className="p-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImage}
                />

                {preview && (
                  <img
                    src={preview}
                    alt="Preview"
                    className="mt-4 w-32 h-32 object-contain border rounded"
                  />
                )}
              </td>
            </tr>
          </tbody>
        </table>

        {/* FOOTER */}
        <div className="p-4 bg-gray-50 flex justify-end">
          <button
            onClick={submit}
            disabled={loading}
            className={`px-6 py-2 rounded font-semibold transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-yellow-400 hover:bg-yellow-500 text-black"
            }`}
          >
            {loading ? "Adding Product..." : "Add Product"}
          </button>
        </div>
      </div>
    </div>
  );
}
