import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded shadow hover:shadow-lg transition p-3">
      <img
  src={`http://localhost:5000/uploads/${product.image}`}
  alt={product.name}
  style={{
    width: "100%",
    height: "180px",          // 🔴 FIXED HEIGHT
    objectFit: "contain",     // 🔴 NO STRETCH
    backgroundColor: "#fff",  // clean background
    padding: "10px"
  }}
/>


      <h3 className="font-semibold text-sm line-clamp-2">
        {product.name}
      </h3>

      <p className="text-gray-500 text-xs mt-1">
        {product.category}
      </p>

      <p className="text-lg font-bold mt-2 text-green-600">
        ₹{product.price}
      </p>

      <button
        onClick={() => addToCart(product)}
        className="mt-3 w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-1 rounded"
      >
        Add to Cart
      </button>
    </div>
  );
}
