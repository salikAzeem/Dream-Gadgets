import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ShoppingCart, Zap, Truck, Shield, RotateCcw, Heart, Share2, Star, Award } from "lucide-react";
import API from "../services/api";
import { useCart } from "../context/CartContext";
import "../styles/productDetail.css";

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    API.get("/products").then((res) => {
      const found = res.data.find((p) => p._id === id);
      setProduct(found);
    });
  }, [id]);

  if (!product) {
    return (
      <div style={styles.loading}>
        <div style={styles.spinner}></div>
        <p>Loading product...</p>
      </div>
    );
  }

  const imageSrc =
    product.image && product.image.startsWith("http")
      ? product.image
      : product.image
      ? `${import.meta.env.VITE_API_URL.replace("/api", "")}/uploads/${product.image}`
      : "/no-image.png";

  const renderStars = (rating = 4) => {
    return (
      <div style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            size={18}
            fill={i <= rating ? "#22c55e" : "none"}
            stroke={i <= rating ? "#22c55e" : "#cbd5e1"}
            strokeWidth={2}
          />
        ))}
        <span style={styles.ratingValue}>4.0</span>
        <span style={styles.ratingCount}>(120 Ratings & 34 Reviews)</span>
      </div>
    );
  };

  return (
    <div style={styles.page} className="pd-page">

      <div style={styles.navbar}>
        <div style={styles.navContainer}>
          <Link to="/" style={styles.backLink}>
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </Link>
          <div style={styles.navActions}>
            <button style={styles.iconBtn}>
              <Heart size={20} />
            </button>
            <button style={styles.iconBtn}>
              <Share2 size={20} />
            </button>
          </div>
        </div>
      </div>

      <div style={styles.container}>
        <div style={styles.mainContent} className="pd-main">

          <div style={styles.leftSection}>
            <div style={styles.imageSection} className="pd-image">

              <div style={styles.mainImageWrapper}>
                <div style={styles.badge}>
                  <Award size={14} />
                  <span>Best Seller</span>
                </div>
                <img
                  src={imageSrc}
                  alt={product.name}
                  onError={(e) => (e.currentTarget.src = "/no-image.png")}
                  style={styles.mainImage}
                />
              </div>
            </div>

            <div style={styles.featureBoxes} className="pd-features">
              <div style={styles.featureBox}>
                <Truck size={24} style={{ color: "#2874f0" }} />
                <div>
                  <div style={styles.featureTitle}>Free Delivery</div>
                  <div style={styles.featureText}>On all orders</div>
                </div>
              </div>
              <div style={styles.featureBoxes} className="pd-features">
                <Shield size={24} style={{ color: "#22c55e" }} />
                <div>
                  <div style={styles.featureTitle}>Secure Payment</div>
                  <div style={styles.featureText}>100% protected</div>
                </div>
              </div>
              <div style={styles.featureBoxes} className="pd-features">
                <RotateCcw size={24} style={{ color: "#f59e0b" }} />
                <div>
                  <div style={styles.featureTitle}>Easy Returns</div>
                  <div style={styles.featureText}>7 day replacement</div>
                </div>
              </div>
            </div>
          </div>

          <div style={styles.rightSection}>
            <div style={styles.productInfo} className="pd-info">

              <div style={styles.categoryBadge}>{product.category}</div>
              <h1 style={styles.productTitle}>{product.name}</h1>

              {renderStars(4)}

              <div style={styles.priceSection}>
                <div style={styles.priceWrapper}>
                  <span style={styles.currentPrice}>₹{product.price}</span>
                  <span style={styles.originalPrice}>₹{Math.floor(product.price * 1.3)}</span>
                  <span style={styles.discountBadge}>23% OFF</span>
                </div>
                <div style={styles.taxInfo}>Inclusive of all taxes</div>
              </div>

              <div style={styles.offersSection}>
                <h3 style={styles.offersTitle}>
                  <Zap size={20} style={{ color: "#facc15" }} />
                  Available Offers
                </h3>
                <div style={styles.offersList}>
                  <div style={styles.offerItem}>
                    <Truck size={18} style={{ color: "#22c55e" }} />
                    <span>Free Delivery on all orders</span>
                  </div>
                  <div style={styles.offerItem}>
                    <Shield size={18} style={{ color: "#22c55e" }} />
                    <span>Cash on Delivery Available</span>
                  </div>
                  <div style={styles.offerItem}>
                    <RotateCcw size={18} style={{ color: "#22c55e" }} />
                    <span>Easy 7-day Replacement Policy</span>
                  </div>
                  <div style={styles.offerItem}>
                    <Award size={18} style={{ color: "#22c55e" }} />
                    <span>1 Year Warranty on all products</span>
                  </div>
                </div>
              </div>

              <div style={styles.description}>
                <h3 style={styles.descriptionTitle}>Product Description</h3>
                <p style={styles.descriptionText}>
                  {product.description || "High-quality product with premium features and excellent build quality. Perfect for everyday use with reliable performance."}
                </p>
              </div>

              <div style={styles.actionButtons} className="pd-actions">

                <button onClick={() => addToCart(product)} style={styles.addToCartBtn}>
                  <ShoppingCart size={22} />
                  <span>Add to Cart</span>
                </button>
                <button style={styles.buyNowBtn}>
                  <Zap size={22} />
                  <span>Buy Now</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div style={styles.reviewsSection}>
          <h2 style={styles.reviewsTitle}>
            <Star size={28} fill="#22c55e" stroke="#22c55e" />
            <span>Ratings & Reviews</span>
          </h2>

          <div style={styles.reviewsGrid} className="pd-reviews">

            <div style={styles.reviewCard}>
              <div style={styles.reviewHeader}>
                <div style={styles.reviewRating}>
                  <Star size={16} fill="#22c55e" stroke="#22c55e" />
                  <span>4</span>
                </div>
                <span style={styles.reviewTitle}>Good Quality</span>
              </div>
              <p style={styles.reviewText}>
                Product quality is very good and delivery was fast. Packaging was excellent.
              </p>
              <div style={styles.reviewFooter}>
                <span style={styles.reviewAuthor}>Rohan, Delhi</span>
                <span style={styles.reviewDate}>2 days ago</span>
              </div>
            </div>

            <div style={styles.reviewCard}>
              <div style={styles.reviewHeader}>
                <div style={styles.reviewRating}>
                  <Star size={16} fill="#22c55e" stroke="#22c55e" />
                  <span>5</span>
                </div>
                <span style={styles.reviewTitle}>Worth the price</span>
              </div>
              <p style={styles.reviewText}>
                Looks premium, fits perfectly. Totally satisfied with the purchase.
              </p>
              <div style={styles.reviewFooter}>
                <span style={styles.reviewAuthor}>Aditi, Mumbai</span>
                <span style={styles.reviewDate}>5 days ago</span>
              </div>
            </div>

            <div style={styles.reviewCard}>
              <div style={styles.reviewHeader}>
                <div style={styles.reviewRating}>
                  <Star size={16} fill="#22c55e" stroke="#22c55e" />
                  <span>4</span>
                </div>
                <span style={styles.reviewTitle}>Great product</span>
              </div>
              <p style={styles.reviewText}>
                Value for money. Recommended for anyone looking for quality products.
              </p>
              <div style={styles.reviewFooter}>
                <span style={styles.reviewAuthor}>Vikram, Bangalore</span>
                <span style={styles.reviewDate}>1 week ago</span>
              </div>
            </div>
          </div>
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
  loading: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    gap: "20px",
    color: "#64748b",
  },
  spinner: {
    width: "48px",
    height: "48px",
    border: "4px solid #e2e8f0",
    borderTop: "4px solid #2874f0",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  navbar: {
    backgroundColor: "white",
    borderBottom: "1px solid #e2e8f0",
    position: "sticky",
    top: 0,
    zIndex: 100,
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  },
  navContainer: {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "16px 30px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  backLink: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: "#2874f0",
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "15px",
    transition: "gap 0.2s",
  },
  navActions: {
    display: "flex",
    gap: "12px",
  },
  iconBtn: {
    width: "40px",
    height: "40px",
    border: "1px solid #e2e8f0",
    backgroundColor: "white",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "all 0.2s",
    color: "#64748b",
  },
  container: {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "40px 30px",
  },
  mainContent: {
    display: "grid",
    gridTemplateColumns: "1fr 1.2fr",
    gap: "48px",
    marginBottom: "60px",
  },
  leftSection: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  imageSection: {
    backgroundColor: "white",
    borderRadius: "20px",
    padding: "40px",
    boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
  },
  mainImageWrapper: {
    position: "relative",
    height: "450px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
    borderRadius: "16px",
    padding: "40px",
  },
  badge: {
    position: "absolute",
    top: "20px",
    left: "20px",
    background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
    color: "white",
    padding: "8px 16px",
    borderRadius: "24px",
    fontSize: "13px",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    boxShadow: "0 4px 12px rgba(245, 158, 11, 0.3)",
  },
  mainImage: {
    width: "70%",
    height: "70%",
    objectFit: "contain",
  },
  featureBoxes: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "16px",
  },
  featureBox: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "12px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    gap: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
  },
  featureTitle: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#212121",
  },
  featureText: {
    fontSize: "12px",
    color: "#878787",
  },
  rightSection: {
    display: "flex",
    flexDirection: "column",
  },
  productInfo: {
    backgroundColor: "white",
    borderRadius: "20px",
    padding: "40px",
    boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
  },
  categoryBadge: {
    display: "inline-block",
    backgroundColor: "#e0f2fe",
    color: "#2874f0",
    padding: "8px 16px",
    borderRadius: "8px",
    fontSize: "13px",
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    marginBottom: "16px",
  },
  productTitle: {
    fontSize: "32px",
    fontWeight: "700",
    color: "#212121",
    marginBottom: "16px",
    lineHeight: "1.3",
  },
  starsContainer: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "24px",
    paddingBottom: "24px",
    borderBottom: "1px solid #f0f0f0",
  },
  ratingValue: {
    fontSize: "16px",
    fontWeight: "700",
    color: "#212121",
    marginLeft: "4px",
  },
  ratingCount: {
    fontSize: "14px",
    color: "#878787",
  },
  priceSection: {
    marginBottom: "28px",
  },
  priceWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    marginBottom: "8px",
  },
  currentPrice: {
    fontSize: "40px",
    fontWeight: "800",
    color: "#212121",
  },
  originalPrice: {
    fontSize: "20px",
    color: "#878787",
    textDecoration: "line-through",
  },
  discountBadge: {
    backgroundColor: "#dcfce7",
    color: "#166534",
    padding: "6px 12px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "700",
  },
  taxInfo: {
    fontSize: "14px",
    color: "#22c55e",
    fontWeight: "600",
  },
  offersSection: {
    background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
    border: "2px solid #22c55e",
    borderRadius: "16px",
    padding: "24px",
    marginBottom: "28px",
  },
  offersTitle: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#166534",
    marginBottom: "16px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  offersList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  offerItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    fontSize: "15px",
    color: "#166534",
    fontWeight: "500",
  },
  description: {
    marginBottom: "32px",
  },
  descriptionTitle: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#212121",
    marginBottom: "12px",
  },
  descriptionText: {
    fontSize: "15px",
    color: "#64748b",
    lineHeight: "1.8",
  },
  actionButtons: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
  },
  addToCartBtn: {
    backgroundColor: "#facc15",
    color: "#000",
    border: "none",
    padding: "18px",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.2s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    boxShadow: "0 4px 16px rgba(250, 204, 21, 0.3)",
  },
  buyNowBtn: {
    background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
    color: "white",
    border: "none",
    padding: "18px",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.2s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    boxShadow: "0 4px 16px rgba(249, 115, 22, 0.3)",
  },
  reviewsSection: {
    backgroundColor: "white",
    borderRadius: "20px",
    padding: "40px",
    boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
  },
  reviewsTitle: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#212121",
    marginBottom: "32px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  reviewsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "20px",
  },
  reviewCard: {
    backgroundColor: "#f8fafc",
    padding: "24px",
    borderRadius: "16px",
    border: "1px solid #e2e8f0",
    transition: "all 0.2s",
  },
  reviewHeader: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "12px",
  },
  reviewRating: {
    backgroundColor: "#22c55e",
    color: "white",
    padding: "6px 12px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "700",
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
  reviewTitle: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#212121",
  },
  reviewText: {
    fontSize: "14px",
    color: "#64748b",
    lineHeight: "1.6",
    marginBottom: "16px",
  },
  reviewFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: "12px",
    borderTop: "1px solid #e2e8f0",
  },
  reviewAuthor: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#212121",
  },
  reviewDate: {
    fontSize: "12px",
    color: "#94a3b8",
  },
};
