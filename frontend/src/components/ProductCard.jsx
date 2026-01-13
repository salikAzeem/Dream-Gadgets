import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  const imageSrc =
    product.image && product.image.startsWith("http")
      ? product.image
      : product.image
      ? `${import.meta.env.VITE_API_URL.replace("/api", "")}/uploads/${product.image}`
      : "/no-image.png";

  return (
    <div
      style={styles.card}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-8px)";
        e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)";
      }}
    >
      <Link to={`/product/${product._id}`} style={styles.link}>
        <div style={styles.imageContainer}>
          <img
            src={imageSrc}
            alt={product.name}
            onError={(e) => (e.target.src = "/no-image.png")}
            style={styles.image}
          />
        </div>

        <div style={styles.content}>
          <h3 style={styles.title}>
            {product.name}
          </h3>

          <p style={styles.category}>
            {product.category}
          </p>

          <div style={styles.priceSection}>
            <p style={styles.price}>
              ₹{product.price}
            </p>
            <div style={styles.rating}>
              <span style={styles.star}>★</span>
              <span style={styles.ratingText}>4.2</span>
            </div>
          </div>
        </div>
      </Link>

      <button
        onClick={() => addToCart(product)}
        style={styles.button}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = "#f5a623";
          e.target.style.transform = "scale(1.02)";
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = "#facc15";
          e.target.style.transform = "scale(1)";
        }}
      >
        Add to Cart
      </button>
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: "white",
    borderRadius: "8px",
    overflow: "hidden",
    transition: "all 0.3s ease",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    height: "100%",
  },
  link: {
    textDecoration: "none",
    color: "inherit",
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  imageContainer: {
    padding: "20px",
    backgroundColor: "#fafafa",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "200px",
    borderBottom: "1px solid #f0f0f0",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
  content: {
    padding: "16px",
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  title: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#212121",
    marginBottom: "6px",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    lineHeight: "1.4",
    minHeight: "39px",
  },
  category: {
    fontSize: "12px",
    color: "#878787",
    marginBottom: "12px",
  },
  priceSection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "auto",
  },
  price: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#212121",
  },
  rating: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    backgroundColor: "#388e3c",
    padding: "4px 8px",
    borderRadius: "4px",
  },
  star: {
    color: "white",
    fontSize: "12px",
  },
  ratingText: {
    color: "white",
    fontSize: "12px",
    fontWeight: "600",
  },
  button: {
    width: "100%",
    backgroundColor: "#facc15",
    color: "#000",
    fontWeight: "600",
    padding: "12px",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    transition: "all 0.2s ease",
    borderTop: "1px solid #f0f0f0",
  },
};
