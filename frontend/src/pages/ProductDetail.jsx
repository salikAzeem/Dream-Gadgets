import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ShoppingCart, Zap, Truck, Shield, RotateCcw } from "lucide-react";
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

  const imageSrc =
    product.image && product.image.startsWith("http")
      ? product.image
      : product.image
      ? `${import.meta.env.VITE_API_URL.replace("/api", "")}/uploads/${product.image}`
      : "/no-image.png";

  const renderStars = (rating = 4) => {
    return (
      <div className="flex items-center gap-1 mt-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <span
            key={i}
            className={`text-xl ${
              i <= rating ? "text-green-600" : "text-gray-300"
            }`}
          >
            ★
          </span>
        ))}
        <span className="text-sm text-gray-600 ml-2 font-medium">
          4.0
        </span>
        <span className="text-sm text-gray-400">
          (120 Ratings & 34 Reviews)
        </span>
      </div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link
            to="/"
            className="text-blue-600 text-sm hover:text-blue-700 font-medium inline-flex items-center gap-2 transition"
          >
            <ArrowLeft size={18} />
            Back to Home
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-8 px-6">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="flex justify-center lg:justify-start">
              <div className="w-full max-w-[420px] h-[420px] border border-gray-200 bg-white flex items-center justify-center rounded-lg p-8" style={{ backgroundColor: "#fafafa" }}>
                <img
                  src={imageSrc}
                  alt={product.name}
                  onError={(e) => (e.currentTarget.src = "/no-image.png")}
                  style={{ width: "20%", height: "20%", objectFit: "contain" }}
                />
              </div>
            </div>

            <div>
              <h1 className="text-3xl font-semibold text-gray-900 leading-tight">
                {product.name}
              </h1>

              {renderStars(4)}

              <p className="text-sm text-gray-500 mt-4 bg-gray-50 inline-block px-3 py-1 rounded">
                Category: <span className="font-medium text-gray-700">{product.category}</span>
              </p>

              <div className="mt-6 flex items-baseline gap-3">
                <span className="text-4xl font-bold text-gray-900">
                  ₹{product.price}
                </span>
                <span className="text-green-600 text-sm font-semibold">
                  Inclusive of all taxes
                </span>
              </div>

              <div className="mt-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-5">
                <h4 className="font-semibold text-base mb-3 text-green-900 flex items-center gap-2">
                  <Shield size={18} className="text-green-600" />
                  Available Offers
                </h4>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li className="flex items-center gap-2">
                    <Truck size={16} className="text-green-600" />
                    Free Delivery
                  </li>
                  <li className="flex items-center gap-2">
                    <Shield size={16} className="text-green-600" />
                    Cash on Delivery Available
                  </li>
                  <li className="flex items-center gap-2">
                    <RotateCcw size={16} className="text-green-600" />
                    Easy 7-day Replacement
                  </li>
                </ul>
              </div>

              <div className="mt-8">
                <h3 className="font-semibold text-lg mb-3 text-gray-900">
                  Product Description
                </h3>
                <p className="text-gray-600 leading-relaxed text-[15px]">
                  {product.description || "No description available."}
                </p>
              </div>

              <div className="mt-10 flex gap-4">
                <button
                  onClick={() => addToCart(product)}
                  className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-4 rounded-lg text-base transition shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={20} />
                  Add to Cart
                </button>

                <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 rounded-lg text-base transition shadow-md hover:shadow-lg flex items-center justify-center gap-2">
                  <Zap size={20} />
                  Buy Now
                </button>
              </div>
            </div>
          </div>

          <div className="mt-16 border-t pt-10">
            <h2 className="text-2xl font-semibold mb-8 text-gray-900">
              Ratings & Reviews
            </h2>

            <div className="space-y-4">
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:border-gray-300 transition">
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-green-600 text-white text-sm px-3 py-1 rounded font-semibold flex items-center gap-1">
                    ★ 4
                  </span>
                  <span className="font-semibold text-gray-900">Good Quality</span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Product quality is very good and delivery was fast.
                </p>
                <p className="text-xs text-gray-500 mt-3">
                  — Rohan, Delhi
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:border-gray-300 transition">
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-green-600 text-white text-sm px-3 py-1 rounded font-semibold flex items-center gap-1">
                    ★ 5
                  </span>
                  <span className="font-semibold text-gray-900">Worth the price</span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Looks premium, fits perfectly. Totally satisfied.
                </p>
                <p className="text-xs text-gray-500 mt-3">
                  — Aditi, Mumbai
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
