import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  // 🔹 Handle BOTH old & new image formats safely
  const isCloudinary =
    product.image && product.image.startsWith("http");

  const imageSrc = isCloudinary
    ? product.image
    : product.image
    ? `${import.meta.env.VITE_API_URL.replace("/api", "")}/uploads/${product.image}`
    : "/no-image.png";

  return (
    <div className="bg-white rounded shadow hover:shadow-lg transition p-3 flex flex-col">

      {/* CLICKABLE AREA */}
      <Link to={`/product/${product._id}`} className="block">
        <img
          src={imageSrc}
          alt={product.name}
          onError={(e) => (e.target.src = "/no-image.png")}
          style={{
            width: "100%",
            height: "180px",
            objectFit: "contain",
            backgroundColor: "#fff",
            padding: "10px",
          }}
        />

        <h3 className="font-semibold text-sm line-clamp-2 mt-2 text-gray-800">
          {product.name}
        </h3>

        <p className="text-gray-500 text-xs mt-1">
          {product.category}
        </p>

        <p className="text-lg font-bold mt-2 text-green-600">
          ₹{product.price}
        </p>
      </Link>

      {/* ADD TO CART (NOT CLICKABLE AREA) */}
      <button
        onClick={() => addToCart(product)}
        className="mt-3 w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-1.5 rounded"
      >
        Add to Cart
      </button>
    </div>
  );
}
