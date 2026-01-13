import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { ShoppingBag, Trash2, ArrowLeft, MessageCircle } from "lucide-react";
import Navbar from "../components/Navbar";
import API from "../services/api";

export default function Cart() {
  const { cart, removeFromCart, totalPrice } = useCart();

  const placeOrder = async () => {
    if (cart.length === 0) return;

    await API.post("/orders", {
      products: cart.map((item) => ({
        name: item.name,
        price: item.price,
        quantity: 1,
      })),
      totalAmount: totalPrice,
    });

    const phoneNumber = "917006502449";
    let message = "🛍️ *New Order - Dream Gadgets*\n\n";

    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.name} - ₹${item.price}\n`;
    });

    message += `\n💰 *Total: ₹${totalPrice}*\n`;
    message += "\n📍 Please confirm availability & payment.";

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      <div className="max-w-5xl mx-auto p-6 py-8">
        <div className="mb-6">
          <Link
            to="/"
            className="text-blue-600 text-sm hover:text-blue-700 font-medium inline-flex items-center gap-2 transition"
          >
            <ArrowLeft size={18} />
            Continue Shopping
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b">
            <ShoppingBag size={28} className="text-blue-600" />
            <h2 className="text-2xl font-semibold text-gray-900">
              Your Cart
              {cart.length > 0 && (
                <span className="text-gray-500 text-lg ml-2">
                  ({cart.length} {cart.length === 1 ? "item" : "items"})
                </span>
              )}
            </h2>
          </div>

          {cart.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingBag size={80} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg mb-6">Your cart is empty</p>
              <Link
                to="/"
                className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-8">
                {cart.map((p) => {
                  const imageSrc =
                    p.image && p.image.startsWith("http")
                      ? p.image
                      : p.image
                      ? `${import.meta.env.VITE_API_URL.replace("/api", "")}/uploads/${p.image}`
                      : "/no-image.png";

                  return (
                    <div
                      key={p._id}
                      className="bg-gray-50 p-5 rounded-lg flex items-center gap-6 border border-gray-200 hover:border-gray-300 transition"
                    >
                      <div className="w-24 h-24 flex items-center justify-center p-2 border border-gray-200 rounded-md" style={{ backgroundColor: "#fafafa" }}>
                        <img
                          src={imageSrc}
                          alt={p.name}
                          onError={(e) => (e.target.src = "/no-image.png")}
                          style={{ width: "20%", height: "20%", objectFit: "contain" }}
                        />
                      </div>

                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-lg mb-1">
                          {p.name}
                        </h3>
                        <p className="text-sm text-gray-500 mb-2">
                          {p.category}
                        </p>
                        <p className="text-xl font-bold text-gray-900">
                          ₹{p.price}
                        </p>
                      </div>

                      <button
                        onClick={() => removeFromCart(p._id)}
                        className="text-red-500 hover:text-red-600 hover:bg-red-50 p-3 rounded-lg transition flex items-center gap-2 font-medium"
                      >
                        <Trash2 size={20} />
                        Remove
                      </button>
                    </div>
                  );
                })}
              </div>

              <div className="border-t pt-6">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg text-gray-700">Subtotal:</span>
                    <span className="text-2xl font-bold text-gray-900">
                      ₹{totalPrice}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
                    <span>Delivery Charges:</span>
                    <span className="text-green-600 font-semibold">FREE</span>
                  </div>
                  <div className="border-t border-gray-300 mt-4 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-semibold text-gray-900">
                        Total Amount:
                      </span>
                      <span className="text-3xl font-bold text-blue-600">
                        ₹{totalPrice}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={placeOrder}
                  className="w-full bg-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-700 transition shadow-lg hover:shadow-xl text-lg flex items-center justify-center gap-3"
                >
                  <MessageCircle size={22} />
                  Place Order via WhatsApp
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
