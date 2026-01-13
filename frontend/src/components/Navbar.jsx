import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { ShoppingCart, Search } from "lucide-react";

export default function Navbar() {
  const { cart } = useCart();

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <Link to="/" style={styles.logo}>
          Dream<span style={{ color: "#facc15" }}>Gadgets</span>
        </Link>

        <div style={styles.searchWrapper}>
          <Search size={20} style={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search for products, brands and more"
            style={styles.search}
          />
        </div>

        <Link to="/cart" style={styles.cart}>
          <ShoppingCart size={22} />
          <span style={styles.cartText}>Cart</span>
          {cart.length > 0 && (
            <span style={styles.badge}>{cart.length}</span>
          )}
        </Link>
      </div>
    </header>
  );
}

const styles = {
  header: {
    backgroundColor: "#2874f0",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  container: {
    maxWidth: "1400px",
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    gap: "20px",
    padding: "12px 30px",
  },
  logo: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "white",
    textDecoration: "none",
    whiteSpace: "nowrap",
    letterSpacing: "-0.5px",
  },
  searchWrapper: {
    flex: 1,
    position: "relative",
    maxWidth: "600px",
  },
  searchIcon: {
    position: "absolute",
    left: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#666",
    pointerEvents: "none",
  },
  search: {
    width: "100%",
    padding: "10px 12px 10px 40px",
    borderRadius: "2px",
    border: "none",
    outline: "none",
    fontSize: "14px",
  },
  cart: {
    position: "relative",
    color: "white",
    textDecoration: "none",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    whiteSpace: "nowrap",
    transition: "transform 0.2s",
    cursor: "pointer",
  },
  cartText: {
    fontSize: "15px",
  },
  badge: {
    position: "absolute",
    top: "-8px",
    right: "-10px",
    backgroundColor: "#facc15",
    color: "#000",
    fontSize: "11px",
    fontWeight: "bold",
    padding: "3px 6px",
    borderRadius: "50%",
    minWidth: "20px",
    textAlign: "center",
  },
};
