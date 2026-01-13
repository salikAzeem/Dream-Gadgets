import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/navbar.css";

import {
  ShoppingCart,
  Search,
  Menu,
  X,
  Moon,
  Sun,
  ChevronDown,
} from "lucide-react";

const categories = [
  "Mobiles",
  "Laptops",
  "Headphones",
  "Smart Watches",
  "Accessories",
];

export default function Navbar() {
  const { cart } = useCart();
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(
    localStorage.getItem("theme") === "dark"
  );
  const [showCategories, setShowCategories] = useState(false);

  /* 🌙 Dark Mode */
  useEffect(() => {
    document.body.style.background = dark ? "#0f172a" : "#f9fafb";
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  /* 🔍 Search */
  const handleSearch = () => {
    if (!query.trim()) return;
    navigate(`/search?q=${query}`);
    setQuery("");
    setMenuOpen(false);
  };

  return (
    <header style={{ ...styles.header, ...(dark && styles.darkHeader) }}>
      {/* TOP BAR */}
      <div style={{ ...styles.topBar, ...(dark && styles.darkTopBar) }}>
        Premium Gadgets at Unbeatable Prices
      </div>

      {/* MAIN NAV */}
      <div style={styles.nav} className="navbar">

        {/* LEFT */}
        <div style={styles.left}>
          <button
  className="menu-btn"
  style={styles.menuBtn}
  onClick={() => setMenuOpen(!menuOpen)}
>

            {menuOpen ? <X /> : <Menu />}
          </button>

          <Link to="/" style={styles.logo}>
            <span style={styles.logoIcon}>DG</span>
            Dream<span style={{ color: "#facc15" }}>Gadgets</span>
          </Link>

          {/* CATEGORIES */}
          <div
            style={styles.categoryWrapper}
            onMouseEnter={() => setShowCategories(true)}
            onMouseLeave={() => setShowCategories(false)}
          >
            <button style={styles.categoryBtn}>
              Categories <ChevronDown size={16} />
            </button>

            {showCategories && (
              <div style={{ ...styles.dropdown, ...(dark && styles.darkDrop) }}>
                {categories.map((cat) => (
                  <Link
                    key={cat}
                    to={`/category/${cat}`}
                    style={styles.dropItem}
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* SEARCH */}
        <div style={styles.searchBox} className="nav-search">

          <Search size={18} />
          <input
            style={styles.searchInput}
            placeholder="Search products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button onClick={handleSearch} style={styles.searchBtn}>
            Search
          </button>
        </div>

        {/* RIGHT */}
        <div style={styles.right}>
          <button
            style={styles.themeBtn}
            onClick={() => setDark(!dark)}
          >
            {dark ? <Sun /> : <Moon />}
          </button>

          <Link to="/cart" style={styles.cart}>
            <ShoppingCart />
            {cart.length > 0 && (
              <span style={styles.badge}>{cart.length}</span>
            )}
          </Link>
        </div>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
  <div style={styles.mobileMenu} className="mobile-menu">

          {categories.map((cat) => (
            <Link
              key={cat}
              to={`/category/${cat}`}
              onClick={() => setMenuOpen(false)}
              style={styles.mobileItem}
            >
              {cat}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
const styles = {
  header: {
    position: "sticky",
    top: 0,
    zIndex: 999,
    background: "#2874f0",
    color: "#fff",
  },

  darkHeader: {
    background: "#020617",
  },

  topBar: {
    textAlign: "center",
    fontSize: "13px",
    padding: "6px",
    background: "#1e3a8a",
  },

  darkTopBar: {
    background: "#020617",
  },

  nav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 20px",
    gap: "12px",
  },

  left: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
  },

  logo: {
    color: "#fff",
    textDecoration: "none",
    fontWeight: 700,
    fontSize: "20px",
  },

  logoIcon: {
    background: "#facc15",
    color: "#000",
    padding: "4px 8px",
    borderRadius: "8px",
    marginRight: "6px",
  },

  menuBtn: {
    background: "transparent",
    border: "none",
    color: "#fff",
    cursor: "pointer",
    display: "none",
  },

  categoryWrapper: {
    position: "relative",
  },

  categoryBtn: {
    background: "transparent",
    border: "none",
    color: "#fff",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },

  dropdown: {
    position: "absolute",
    top: "36px",
    left: 0,
    background: "#fff",
    color: "#000",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
    zIndex: 1000,
  },

  darkDrop: {
    background: "#020617",
    color: "#fff",
  },

  dropItem: {
    padding: "10px 14px",
    display: "block",
    textDecoration: "none",
    color: "inherit",
  },

  searchBox: {
    flex: 1,
    maxWidth: "450px",
    display: "flex",
    alignItems: "center",
    background: "#fff",
    borderRadius: "999px",
    padding: "4px 10px",
    color: "#000",
  },

  searchInput: {
    flex: 1,
    border: "none",
    outline: "none",
    padding: "8px",
  },

  searchBtn: {
    background: "#facc15",
    border: "none",
    borderRadius: "999px",
    padding: "6px 16px",
    cursor: "pointer",
    fontWeight: 600,
  },

  right: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
  },

  themeBtn: {
    background: "transparent",
    border: "none",
    color: "#fff",
    cursor: "pointer",
  },

  cart: {
    position: "relative",
    color: "#fff",
    textDecoration: "none",
  },

  badge: {
    position: "absolute",
    top: "-6px",
    right: "-8px",
    background: "#facc15",
    color: "#000",
    borderRadius: "50%",
    padding: "2px 6px",
    fontSize: "11px",
    fontWeight: "bold",
  },

  mobileMenu: {
    display: "none",
    flexDirection: "column",
    padding: "10px",
  },

  mobileItem: {
    padding: "12px",
    textDecoration: "none",
    color: "inherit",
  },
};

