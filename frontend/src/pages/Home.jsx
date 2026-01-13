import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import API from "../services/api";

export default function Home() {
  const [products, setProducts] = useState([]);

  const categories = [
    "All",
    "Phone",
    "Phone Cover",
    "Earbuds",
    "Smart Watch",
    "Charger",
    "Cable",
    "Screen Guard",
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
    <>
      <Navbar />

      <div style={styles.categoryBar}>
        <div style={styles.categoryContainer}>
          {categories.map((cat) => (
            <button
              key={cat}
              style={{
                ...styles.categoryBtn,
                backgroundColor:
                  selectedCategory === cat ? "#2874f0" : "white",
                color: selectedCategory === cat ? "white" : "#333",
                borderColor: selectedCategory === cat ? "#2874f0" : "#e0e0e0",
                transform: selectedCategory === cat ? "translateY(-2px)" : "none",
                boxShadow: selectedCategory === cat
                  ? "0 4px 12px rgba(40, 116, 240, 0.3)"
                  : "0 1px 3px rgba(0,0,0,0.1)",
              }}
              onClick={() => setSelectedCategory(cat)}
              onMouseEnter={(e) => {
                if (selectedCategory !== cat) {
                  e.target.style.borderColor = "#2874f0";
                  e.target.style.color = "#2874f0";
                  e.target.style.transform = "translateY(-1px)";
                }
              }}
              onMouseLeave={(e) => {
                if (selectedCategory !== cat) {
                  e.target.style.borderColor = "#e0e0e0";
                  e.target.style.color = "#333";
                  e.target.style.transform = "none";
                }
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div style={styles.container}>
        <div style={styles.headerSection}>
          <h2 style={styles.heading}>Best Deals for You</h2>
          <p style={styles.subheading}>
            {filtered.length} products available
          </p>
        </div>

        <div style={styles.grid}>
          {filtered.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}

const styles = {
  categoryBar: {
    backgroundColor: "white",
    borderBottom: "1px solid #e0e0e0",
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
    padding: "16px 0",
  },
  categoryContainer: {
    maxWidth: "1400px",
    margin: "0 auto",
    display: "flex",
    gap: "12px",
    padding: "0 30px",
    flexWrap: "wrap",
  },
  categoryBtn: {
    padding: "10px 20px",
    border: "1px solid",
    cursor: "pointer",
    borderRadius: "4px",
    fontSize: "14px",
    fontWeight: "500",
    transition: "all 0.2s ease",
    whiteSpace: "nowrap",
  },
  container: {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "30px",
    backgroundColor: "#f8f8f8",
    minHeight: "calc(100vh - 200px)",
  },
  headerSection: {
    marginBottom: "30px",
  },
  heading: {
    fontSize: "28px",
    fontWeight: "600",
    color: "#212121",
    marginBottom: "6px",
  },
  subheading: {
    fontSize: "14px",
    color: "#878787",
    fontWeight: "400",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "20px",
  },
};
