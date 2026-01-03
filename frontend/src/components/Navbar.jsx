import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { cart } = useCart();

  return (
    <header style={styles.header}>
      <Link to="/" style={styles.logo}>
        Dream<span style={{ color: "#facc15" }}>Gadgets</span>
      </Link>

      <input
        type="text"
        placeholder="Search for products"
        style={styles.search}
      />

      <Link to="/cart" style={styles.cart}>
        Cart 🛒
        {cart.length > 0 && (
          <span style={styles.badge}>{cart.length}</span>
        )}
      </Link>
    </header>
  );
}

const styles = {
  header: {
    backgroundColor: "#2874f0",
    display: "flex",
    alignItems: "center",
    gap: "20px",
    padding: "10px 30px",
    color: "white",
  },
  logo: {
    fontSize: "22px",
    fontWeight: "bold",
    color: "white",
    textDecoration: "none",
  },
  search: {
    flex: 1,
    padding: "8px 12px",
    borderRadius: "4px",
    border: "none",
    outline: "none",
  },
  cart: {
    position: "relative",
    color: "white",
    textDecoration: "none",
    fontWeight: "bold",
  },
  badge: {
    position: "absolute",
    top: "-6px",
    right: "-10px",
    backgroundColor: "#facc15",
    color: "black",
    fontSize: "12px",
    padding: "2px 6px",
    borderRadius: "50%",
  },
};
