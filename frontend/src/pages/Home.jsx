import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import API from "../services/api";
import { Sparkles, TrendingUp, Zap, Package } from "lucide-react";

export default function Home() {
  const [products, setProducts] = useState([]);

  const categories = [
    { name: "All", icon: "📱" },
    { name: "Phone", icon: "📱" },
    { name: "Phone Cover", icon: "🛡️" },
    { name: "Earbuds", icon: "🎧" },
    { name: "Smart Watch", icon: "⌚" },
    { name: "Charger", icon: "🔌" },
    { name: "Cable", icon: "🔗" },
    { name: "Screen Guard", icon: "🛡️" },
  ];

  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    API.get("/products").then((res) => setProducts(res.data));
  }, []);

  const filtered =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <div style={styles.page}>
      <Navbar />

      <div style={styles.hero}>
        <div style={styles.heroContent}>
          <div style={styles.heroText}>
            <div style={styles.heroTag}>
              <Sparkles size={16} />
              <span>New Arrivals</span>
            </div>
            <h1 style={styles.heroTitle}>
              Discover Amazing Deals on
              <span style={styles.heroHighlight}> Dream Gadgets</span>
            </h1>
            <p style={styles.heroSubtitle}>
              Shop the latest tech at unbeatable prices. Free delivery on all orders!
            </p>
            <div style={styles.heroStats}>
              <div style={styles.statItem}>
                <TrendingUp size={20} style={{ color: "#22c55e" }} />
                <div>
                  <div style={styles.statValue}>500+</div>
                  <div style={styles.statLabel}>Products</div>
                </div>
              </div>
              <div style={styles.statItem}>
                <Zap size={20} style={{ color: "#facc15" }} />
                <div>
                  <div style={styles.statValue}>24/7</div>
                  <div style={styles.statLabel}>Support</div>
                </div>
              </div>
              <div style={styles.statItem}>
                <Package size={20} style={{ color: "#2874f0" }} />
                <div>
                  <div style={styles.statValue}>Free</div>
                  <div style={styles.statLabel}>Delivery</div>
                </div>
              </div>
            </div>
          </div>
          <div style={styles.heroImage}>
            <div style={styles.floatingCard}>
              <div style={styles.floatingIcon}>📱</div>
            </div>
          </div>
        </div>
      </div>

      <div style={styles.categorySection}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>Shop by Category</h2>
          <div style={styles.categoryGrid}>
            {categories.map((cat) => (
              <button
                key={cat.name}
                style={{
                  ...styles.categoryBtn,
                  background:
                    selectedCategory === cat.name
                      ? "linear-gradient(135deg, #2874f0 0%, #1e3a8a 100%)"
                      : "white",
                  color: selectedCategory === cat.name ? "white" : "#333",
                  transform: selectedCategory === cat.name ? "translateY(-4px) scale(1.05)" : "none",
                  boxShadow:
                    selectedCategory === cat.name
                      ? "0 8px 20px rgba(40, 116, 240, 0.3)"
                      : "0 2px 8px rgba(0,0,0,0.08)",
                }}
                onClick={() => setSelectedCategory(cat.name)}
              >
                <span style={styles.categoryIcon}>{cat.icon}</span>
                <span style={styles.categoryName}>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={styles.productsSection}>
        <div style={styles.container}>
          <div style={styles.headerSection}>
            <div>
              <h2 style={styles.heading}>
                {selectedCategory === "All" ? "All Products" : selectedCategory}
              </h2>
              <p style={styles.subheading}>
                {filtered.length} {filtered.length === 1 ? "product" : "products"} available
              </p>
            </div>
            <div style={styles.filterBadge}>
              <Sparkles size={16} />
              <span>Best Deals</span>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div style={styles.emptyState}>
              <Package size={64} style={{ color: "#cbd5e1" }} />
              <h3 style={styles.emptyTitle}>No products found</h3>
              <p style={styles.emptyText}>Try selecting a different category</p>
            </div>
          ) : (
            <div style={styles.grid}>
              {filtered.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#f8fafc",
  },
  hero: {
    background: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 50%, #3b82f6 100%)",
    padding: "60px 30px",
    position: "relative",
    overflow: "hidden",
  },
  heroContent: {
    maxWidth: "1400px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "60px",
    alignItems: "center",
  },
  heroText: {
    color: "white",
  },
  heroTag: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    backgroundColor: "rgba(250, 204, 21, 0.2)",
    border: "1px solid rgba(250, 204, 21, 0.3)",
    padding: "8px 16px",
    borderRadius: "24px",
    fontSize: "14px",
    fontWeight: "600",
    marginBottom: "24px",
    color: "#facc15",
  },
  heroTitle: {
    fontSize: "48px",
    fontWeight: "800",
    lineHeight: "1.2",
    marginBottom: "20px",
  },
  heroHighlight: {
    background: "linear-gradient(135deg, #facc15 0%, #f59e0b 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  heroSubtitle: {
    fontSize: "18px",
    opacity: 0.9,
    marginBottom: "32px",
    lineHeight: "1.6",
  },
  heroStats: {
    display: "flex",
    gap: "32px",
  },
  statItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    backgroundColor: "rgba(255,255,255,0.1)",
    padding: "16px 24px",
    borderRadius: "12px",
    backdropFilter: "blur(10px)",
  },
  statValue: {
    fontSize: "24px",
    fontWeight: "700",
  },
  statLabel: {
    fontSize: "12px",
    opacity: 0.8,
  },
  heroImage: {
    position: "relative",
    height: "400px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  floatingCard: {
    width: "300px",
    height: "300px",
    background: "rgba(255,255,255,0.1)",
    backdropFilter: "blur(20px)",
    borderRadius: "32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
    border: "1px solid rgba(255,255,255,0.2)",
    animation: "float 3s ease-in-out infinite",
  },
  floatingIcon: {
    fontSize: "120px",
  },
  categorySection: {
    backgroundColor: "white",
    padding: "48px 0",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  },
  container: {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "0 30px",
  },
  sectionTitle: {
    fontSize: "32px",
    fontWeight: "700",
    color: "#212121",
    marginBottom: "32px",
    textAlign: "center",
  },
  categoryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
    gap: "16px",
  },
  categoryBtn: {
    padding: "20px",
    border: "2px solid #f0f0f0",
    cursor: "pointer",
    borderRadius: "16px",
    fontSize: "14px",
    fontWeight: "600",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "12px",
  },
  categoryIcon: {
    fontSize: "32px",
  },
  categoryName: {
    whiteSpace: "nowrap",
  },
  productsSection: {
    padding: "60px 0",
    minHeight: "60vh",
  },
  headerSection: {
    marginBottom: "40px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  heading: {
    fontSize: "36px",
    fontWeight: "700",
    color: "#212121",
    marginBottom: "8px",
  },
  subheading: {
    fontSize: "16px",
    color: "#878787",
    fontWeight: "500",
  },
  filterBadge: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    backgroundColor: "#fef3c7",
    color: "#92400e",
    padding: "12px 24px",
    borderRadius: "12px",
    fontWeight: "600",
    fontSize: "14px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: "24px",
  },
  emptyState: {
    textAlign: "center",
    padding: "80px 20px",
  },
  emptyTitle: {
    fontSize: "24px",
    fontWeight: "600",
    color: "#64748b",
    marginTop: "20px",
    marginBottom: "8px",
  },
  emptyText: {
    fontSize: "16px",
    color: "#94a3b8",
  },
};
