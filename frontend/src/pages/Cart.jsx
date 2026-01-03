import { useCart } from "../context/CartContext";
import Navbar from "../components/Navbar";
import API from "../services/api";

export default function Cart() {
  const { cart, removeFromCart, totalPrice } = useCart();

  const placeOrder = async () => {
    if (cart.length === 0) return;

    // 1️⃣ Save order in DB
    await API.post("/orders", {
      products: cart.map(item => ({
        name: item.name,
        price: item.price,
        quantity: 1
      })),
      totalAmount: totalPrice
    });

    // 2️⃣ WhatsApp message
    const phoneNumber = "917006502449"; // 🔴 shop owner number
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
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">Your Cart</h2>

        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <>
            {cart.map(p => (
              <div
                key={p._id}
                className="bg-white p-4 mb-4 flex justify-between items-center rounded"
              >
                <div>
                  <h3 className="font-semibold">{p.name}</h3>
                  <p>₹{p.price}</p>
                </div>

                <button
                  onClick={() => removeFromCart(p._id)}
                  className="text-red-500"
                >
                  Remove
                </button>
              </div>
            ))}

            <div className="flex justify-between items-center mt-6">
              <span className="text-xl font-bold">
                Total: ₹{totalPrice}
              </span>

              <button
                onClick={placeOrder}
                className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700"
              >
                Place Order 💬
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
