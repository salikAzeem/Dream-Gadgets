import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { MapPin, Phone, User, MessageCircle } from "lucide-react";
import Navbar from "../components/Navbar";
import API from "../services/api";

export default function Checkout() {
  const { cart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const placeOrder = async () => {
    if (!form.name || !form.phone || !form.address) {
      alert("Please fill all required fields");
      return;
    }

    await API.post("/orders", {
      customer: form,
      products: cart.map((p) => ({
        name: p.name,
        price: p.price,
        quantity: 1,
      })),
      totalAmount: totalPrice,
    });

    let message = `🛍️ *New Order - Dream Gadgets*\n\n`;
    message += `👤 *Name:* ${form.name}\n`;
    message += `📞 *Phone:* ${form.phone}\n`;
    message += `📍 *Address:* ${form.address}, ${form.city} - ${form.pincode}\n\n`;

    cart.forEach((item, i) => {
      message += `${i + 1}. ${item.name} - ₹${item.price}\n`;
    });

    message += `\n💰 *Total:* ₹${totalPrice}`;

    window.open(
      `https://wa.me/917006502449?text=${encodeURIComponent(message)}`,
      "_blank"
    );

    clearCart();
    navigate("/");
  };

  if (cart.length === 0) {
    navigate("/");
    return null;
  }

  return (
    <div style={styles.page}>
      <Navbar />

      <div style={styles.container}>
        <div style={styles.left}>
          <h2>Delivery Details</h2>

          <input name="name" placeholder="Full Name" onChange={handleChange} />
          <input name="phone" placeholder="Phone Number" onChange={handleChange} />
          <input name="address" placeholder="Full Address" onChange={handleChange} />
          <input name="city" placeholder="City" onChange={handleChange} />
          <input name="pincode" placeholder="Pincode" onChange={handleChange} />
        </div>

        <div style={styles.right}>
          <h3>Order Summary</h3>

          {cart.map((p) => (
            <div key={p._id} style={styles.item}>
              <span>{p.name}</span>
              <span>₹{p.price}</span>
            </div>
          ))}

          <div style={styles.total}>
            <span>Total</span>
            <strong>₹{totalPrice}</strong>
          </div>

          <button style={styles.btn} onClick={placeOrder}>
            <MessageCircle /> Place Order via WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}
const styles = {
  page: { background: "#f8fafc", minHeight: "100vh" },
  container: {
    maxWidth: "1100px",
    margin: "40px auto",
    padding: "20px",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "32px",
  },
  left: {
    background: "white",
    padding: "32px",
    borderRadius: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  right: {
    background: "white",
    padding: "32px",
    borderRadius: "16px",
  },
  item: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
  },
  total: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
    fontSize: "18px",
  },
  btn: {
    marginTop: "24px",
    width: "100%",
    padding: "16px",
    background: "#22c55e",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontWeight: "700",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  },
};
