import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../services/api";
import { useCart } from "../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    API.get("/products").then((res) => {
      const found = res.data.find((p) => p._id === id);
      setProduct(found);
    });
  }, [id]);

  if (!product) {
    return <p className="p-10">Loading product...</p>;
  }

  // ✅ Safe image handling (local + cloudinary)
  const imageSrc =
    product.image && product.image.startsWith("http")
      ? product.image
      : product.image
      ? `${import.meta.env.VITE_API_URL.replace("/api", "")}/uploads/${product.image}`
      : "/no-image.png";

  // ⭐ STAR RENDER
  const renderStars = (rating = 4) => {
    return (
      <div className="flex items-center gap-1 mt-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <span
            key={i}
            className={`text-lg ${
              i <= rating ? "text-green-600" : "text-gray-300"
            }`}
          >
            ★
          </span>
        ))}
        <span className="text-sm text-gray-600 ml-2">
          4.0 (120 Ratings & 34 Reviews)
        </span>
      </div>
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen py-6">
      <div className="max-w-7xl mx-auto bg-white rounded shadow-sm p-4 md:p-8">

        {/* BACK */}
        <Link to="/" className="text-blue-600 text-sm hover:underline">
          ← Back to Home
        </Link>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* LEFT IMAGE (FIXED SIZE LIKE FLIPKART) */}
          <div className="flex justify-center">
            <div className="w-[420px] h-[420px] border bg-white flex items-center justify-center">
              <img
                src={imageSrc}
                alt={product.name}
                onError={(e) => (e.currentTarget.src = "/no-image.png")}
                className="w-full h-full object-contain p-6"
              />
            </div>
          </div>

          {/* RIGHT DETAILS */}
          <div>

            {/* TITLE */}
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">
              {product.name}
            </h1>

            {/* ⭐ RATING */}
            {renderStars(4)}

            {/* CATEGORY */}
            <p className="text-sm text-gray-500 mt-2">
              Category: <span className="font-medium">{product.category}</span>
            </p>

            {/* PRICE */}
            <div className="mt-4 flex items-center gap-4">
              <span className="text-3xl font-bold text-gray-900">
                ₹{product.price}
              </span>
              <span className="text-green-600 text-sm font-medium">
                Inclusive of all taxes
              </span>
            </div>

            {/* OFFERS */}
            <div className="mt-4 bg-green-50 border border-green-200 rounded p-4">
              <h4 className="font-semibold text-sm mb-2">
                Available Offers
              </h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>✔ Free Delivery</li>
                <li>✔ Cash on Delivery Available</li>
                <li>✔ Easy 7-day Replacement</li>
              </ul>
            </div>

            {/* DESCRIPTION */}
            <div className="mt-6">
              <h3 className="font-semibold text-lg mb-2">
                Product Description
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {product.description || "No description available."}
              </p>
            </div>

            {/* ACTION BUTTONS */}
            <div className="mt-8 flex gap-4">
              <button
                onClick={() => addToCart(product)}
                className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 rounded-md text-lg"
              >
                🛒 Add to Cart
              </button>

              <button
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-md text-lg"
              >
                ⚡ Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* ⭐ REVIEWS SECTION */}
        <div className="mt-12 border-t pt-8">
          <h2 className="text-xl font-semibold mb-6">
            Ratings & Reviews
          </h2>

          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded">
              <div className="flex items-center gap-2">
                <span className="bg-green-600 text-white text-xs px-2 py-1 rounded">
                  ★ 4
                </span>
                <span className="font-medium">Good Quality</span>
              </div>
              <p className="text-sm text-gray-700 mt-2">
                Product quality is very good and delivery was fast.
              </p>
              <p className="text-xs text-gray-500 mt-1">
                — Rohan, Delhi
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded">
              <div className="flex items-center gap-2">
                <span className="bg-green-600 text-white text-xs px-2 py-1 rounded">
                  ★ 5
                </span>
                <span className="font-medium">Worth the price</span>
              </div>
              <p className="text-sm text-gray-700 mt-2">
                Looks premium, fits perfectly. Totally satisfied.
              </p>
              <p className="text-xs text-gray-500 mt-1">
                — Aditi, Mumbai
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
