import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { ShoppingCart, Star, TrendingUp } from "lucide-react";
import { useState } from "react";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);

  const imageSrc =
    product.image && product.image.startsWith("http")
      ? product.image
      : product.image
      ? `${import.meta.env.VITE_API_URL.replace("/api", "")}/uploads/${product.image}`
      : "/no-image.png";

  return (
    <div
      style={{
        ...styles.card,
        transform: isHovered ? "translateY(-12px)" : "translateY(0)",
        boxShadow: isHovered
          ? "0 20px 40px rgba(0,0,0,0.15)"
          : "0 4px 12px rgba(0,0,0,0.08)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={styles.badge}>
        <TrendingUp size={12} />
        <span>Trending</span>
      </div>

      <Link to={`/product/${product._id}`} style={styles.link}>
        <div style={styles.imageContainer}>
          <div style={styles.imageWrapper}>
            <img
              src={imageSrc}
              alt={product.name}
              onError={(e) => (e.target.src = "/no-image.png")}
              style={{
                ...styles.image,
                transform: isHovered ? "scale(1.1)" : "scale(1)",
              }}
            />
          </div>
        </div>

        <div style={styles.content}>
          <div style={styles.categoryTag}>{product.category}</div>

          <h3 style={styles.title}>{product.name}</h3>

          <div style={styles.ratingRow}>
            <div style={styles.rating}>
              <Star size={14} fill="#22c55e" stroke="#22c55e" />
              <span style={styles.ratingText}>4.2</span>
            </div>
            <span style={styles.reviews}>(256 reviews)</span>
          </div>

          <div style={styles.priceSection}>
            <div>
              <p style={styles.price}>₹{product.price}</p>
              <p style={styles.originalPrice}>₹{Math.floor(product.price * 1.3)}</p>
            </div>
            <div style={styles.discount}>23% OFF</div>
          </div>

          <div style={styles.features}>
            <span style={styles.feature}>✓ Fast Delivery</span>
            <span style={styles.feature}>✓ COD Available</span>
          </div>
        </div>
      </Link>

      <button
        onClick={() => addToCart(product)}
        style={{
          ...styles.button,
          backgroundColor: isHovered ? "#f59e0b" : "#facc15",
          transform: isHovered ? "scale(1.02)" : "scale(1)",
        }}
      >
        <ShoppingCart size={18} />
        <span>Add to Cart</span>
      </button>
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: "white",
    borderRadius: "16px",
    overflow: "hidden",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    position: "relative",
    border: "1px solid #f0f0f0",
  },
  badge: {
    position: "absolute",
    top: "12px",
    left: "12px",
    background: "linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)",
    color: "white",
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "11px",
    fontWeight: "600",
    zIndex: 10,
    display: "flex",
    alignItems: "center",
    gap: "4px",
    boxShadow: "0 2px 8px rgba(236, 72, 153, 0.3)",
  },
  link: {
    textDecoration: "none",
    color: "inherit",
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  imageContainer: {
    padding: "32px 20px 20px 20px",
    background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
    borderBottom: "1px solid #f0f0f0",
  },
  imageWrapper: {
    height: "180px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "16px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
  },
  content: {
    padding: "20px",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  categoryTag: {
    fontSize: "11px",
    color: "#2874f0",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    backgroundColor: "#e0f2fe",
    padding: "4px 10px",
    borderRadius: "4px",
    alignSelf: "flex-start",
  },
  title: {
    fontSize: "15px",
    fontWeight: "600",
    color: "#212121",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    lineHeight: "1.5",
    minHeight: "45px",
  },
  ratingRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  rating: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    backgroundColor: "#22c55e",
    padding: "4px 8px",
    borderRadius: "6px",
  },
  ratingText: {
    color: "white",
    fontSize: "12px",
    fontWeight: "700",
  },
  reviews: {
    fontSize: "12px",
    color: "#878787",
  },
  priceSection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "4px",
  },
  price: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#212121",
    marginBottom: "2px",
  },
  originalPrice: {
    fontSize: "13px",
    color: "#878787",
    textDecoration: "line-through",
  },
  discount: {
    color: "#22c55e",
    fontSize: "13px",
    fontWeight: "700",
    backgroundColor: "#f0fdf4",
    padding: "6px 10px",
    borderRadius: "6px",
  },
  features: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    marginTop: "4px",
  },
  feature: {
    fontSize: "11px",
    color: "#059669",
    fontWeight: "500",
  },
  button: {
    width: "100%",
    color: "#000",
    fontWeight: "700",
    padding: "14px",
    border: "none",
    cursor: "pointer",
    fontSize: "15px",
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    boxShadow: "0 -2px 10px rgba(0,0,0,0.05)",
  },
};
