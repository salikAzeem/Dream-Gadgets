import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import API from "../services/api";

export default function Home() {
  const [products, setProducts] = useState([]);

  const categories = [
    "All",
    "Phone Cover",
    "Earbuds",
    "Watch",
    "Accessories",
  ];

  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    API.get("/products").then(res => setProducts(res.data));
  }, []);

  const filtered =
    selectedCategory === "All"
      ? products
      : products.filter(p => p.category === selectedCategory);

  return (
    <>
      <Navbar />

      {/* CATEGORY BAR */}
      <div style={styles.categoryBar}>
        {categories.map(cat => (
          <button
            key={cat}
            style={{
              ...styles.categoryBtn,
              backgroundColor:
                selectedCategory === cat ? "#2874f0" : "white",
              color:
                selectedCategory === cat ? "white" : "black",
            }}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* PRODUCTS */}
      <div style={styles.container}>
        <h2 style={styles.heading}>Best Deals for You</h2>

        <div style={styles.grid}>
          {filtered.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}

const styles = {
  categoryBar: {
    display: "flex",
    gap: "10px",
    padding: "10px 30px",
    backgroundColor: "white",
    borderBottom: "1px solid #ddd",
  },
  categoryBtn: {
    padding: "6px 14px",
    border: "1px solid #ddd",
    cursor: "pointer",
  },
  container: {
    padding: "20px 30px",
  },
  heading: {
    marginBottom: "20px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "20px",
  },
};
