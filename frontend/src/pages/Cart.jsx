import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { ShoppingBag, Trash2, ArrowLeft, MessageCircle, Tag, TrendingUp, Package } from "lucide-react";
import Navbar from "../components/Navbar";
import API from "../services/api";

export default function Cart() {
  const { cart, removeFromCart, totalPrice } = useCart();

  const placeOrder = async () => {
    if (cart.length === 0) return;

    await API.post("/orders", {
      products: cart.map((item) => ({
        name: item.name,
        price: item.price,
        quantity: 1,
      })),
      totalAmount: totalPrice,
    });

    const phoneNumber = "917006502449";
    let message = "🛍️ *New Order - Dream Gadgets*\n\n";

    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.name} - ₹${item.price}\n`;
    });

    message += `\n💰 *Total: ₹${totalPrice}*\n`;
    message += "\n📍 Please confirm availability & payment.";

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const savings = Math.floor(totalPrice * 0.23);

  return (
    <div style={styles.page}>
      <Navbar />

      <div style={styles.container}>
        <div style={styles.backSection}>
          <Link to="/" style={styles.backLink}>
            <ArrowLeft size={20} />
            <span>Continue Shopping</span>
          </Link>
        </div>

        <div style={styles.content}>
          <div style={styles.leftColumn}>
            <div style={styles.cartHeader}>
              <div style={styles.headerLeft}>
                <ShoppingBag size={32} style={{ color: "#2874f0" }} />
                <div>
                  <h2 style={styles.cartTitle}>Shopping Cart</h2>
                  <p style={styles.cartSubtitle}>
                    {cart.length} {cart.length === 1 ? "item" : "items"} in your cart
                  </p>
                </div>
              </div>
              {cart.length > 0 && (
                <div style={styles.savingsBadge}>
                  <TrendingUp size={16} />
                  <span>Save ₹{savings}</span>
                </div>
              )}
            </div>

            {cart.length === 0 ? (
              <div style={styles.emptyCart}>
                <div style={styles.emptyIcon}>
                  <ShoppingBag size={80} />
                </div>
                <h3 style={styles.emptyTitle}>Your cart is empty</h3>
                <p style={styles.emptyText}>
                  Add some amazing products to your cart and make your day special!
                </p>
                <Link to="/" style={styles.shopButton}>
                  <Package size={20} />
                  <span>Start Shopping</span>
                </Link>
              </div>
            ) : (
              <div style={styles.cartItems}>
                {cart.map((p) => {
                  const imageSrc =
                    p.image && p.image.startsWith("http")
                      ? p.image
                      : p.image
                      ? `${import.meta.env.VITE_API_URL.replace("/api", "")}/uploads/${p.image}`
                      : "/no-image.png";

                  return (
                    <div key={p._id} style={styles.cartItem}>
                      <div style={styles.itemImage}>
                        <img
                          src={imageSrc}
                          alt={p.name}
                          onError={(e) => (e.target.src = "/no-image.png")}
                          style={styles.image}
                        />
                      </div>

                      <div style={styles.itemDetails}>
                        <h3 style={styles.itemName}>{p.name}</h3>
                        <p style={styles.itemCategory}>{p.category}</p>
                        <div style={styles.itemFeatures}>
                          <span style={styles.feature}>✓ Free Delivery</span>
                          <span style={styles.feature}>✓ 7 Day Replacement</span>
                        </div>
                        <div style={styles.itemPriceSection}>
                          <span style={styles.itemPrice}>₹{p.price}</span>
                          <span style={styles.itemOriginalPrice}>
                            ₹{Math.floor(p.price * 1.3)}
                          </span>
                          <span style={styles.itemDiscount}>23% off</span>
                        </div>
                      </div>

                      <button
                        onClick={() => removeFromCart(p._id)}
                        style={styles.removeButton}
                      >
                        <Trash2 size={20} />
                        <span>Remove</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {cart.length > 0 && (
            <div style={styles.rightColumn}>
              <div style={styles.summaryCard}>
                <h3 style={styles.summaryTitle}>Order Summary</h3>

                <div style={styles.summaryRow}>
                  <span style={styles.summaryLabel}>Subtotal ({cart.length} items)</span>
                  <span style={styles.summaryValue}>₹{totalPrice + savings}</span>
                </div>

                <div style={styles.summaryRow}>
                  <span style={styles.summaryLabel}>Discount</span>
                  <span style={styles.discountValue}>- ₹{savings}</span>
                </div>

                <div style={styles.summaryRow}>
                  <span style={styles.summaryLabel}>Delivery Charges</span>
                  <span style={styles.freeValue}>FREE</span>
                </div>

                <div style={styles.divider}></div>

                <div style={styles.totalRow}>
                  <span style={styles.totalLabel}>Total Amount</span>
                  <span style={styles.totalValue}>₹{totalPrice}</span>
                </div>

                <div style={styles.savingsInfo}>
                  <Tag size={18} style={{ color: "#22c55e" }} />
                  <span>You will save ₹{savings} on this order</span>
                </div>

                <button onClick={placeOrder} style={styles.checkoutButton}>
                  <MessageCircle size={22} />
                  <span>Place Order via WhatsApp</span>
                </button>

                <div style={styles.secureInfo}>
                  <span>🔒</span>
                  <span>100% Secure Payments</span>
                </div>
              </div>

              <div style={styles.benefitsCard}>
                <h4 style={styles.benefitsTitle}>Why shop with us?</h4>
                <div style={styles.benefitsList}>
                  <div style={styles.benefitItem}>
                    <span style={styles.benefitIcon}>✓</span>
                    <span>Free delivery on all orders</span>
                  </div>
                  <div style={styles.benefitItem}>
                    <span style={styles.benefitIcon}>✓</span>
                    <span>Cash on Delivery available</span>
                  </div>
                  <div style={styles.benefitItem}>
                    <span style={styles.benefitIcon}>✓</span>
                    <span>7-day replacement policy</span>
                  </div>
                  <div style={styles.benefitItem}>
                    <span style={styles.benefitIcon}>✓</span>
                    <span>24/7 Customer support</span>
                  </div>
                </div>
              </div>
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
  container: {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "40px 30px",
  },
  backSection: {
    marginBottom: "32px",
  },
  backLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    color: "#2874f0",
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "15px",
    transition: "gap 0.2s",
  },
  content: {
    display: "grid",
    gridTemplateColumns: "1fr 420px",
    gap: "32px",
  },
  leftColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  cartHeader: {
    backgroundColor: "white",
    padding: "32px",
    borderRadius: "20px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },
  cartTitle: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#212121",
    marginBottom: "4px",
  },
  cartSubtitle: {
    fontSize: "14px",
    color: "#878787",
  },
  savingsBadge: {
    background: "linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)",
    color: "#166534",
    padding: "12px 20px",
    borderRadius: "12px",
    fontWeight: "700",
    fontSize: "15px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  emptyCart: {
    backgroundColor: "white",
    borderRadius: "20px",
    padding: "80px 40px",
    textAlign: "center",
    boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
  },
  emptyIcon: {
    color: "#cbd5e1",
    marginBottom: "24px",
  },
  emptyTitle: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#64748b",
    marginBottom: "12px",
  },
  emptyText: {
    fontSize: "16px",
    color: "#94a3b8",
    marginBottom: "32px",
    maxWidth: "400px",
    margin: "0 auto 32px auto",
  },
  shopButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
    backgroundColor: "#2874f0",
    color: "white",
    padding: "16px 32px",
    borderRadius: "12px",
    fontWeight: "700",
    fontSize: "16px",
    textDecoration: "none",
    transition: "all 0.2s",
    boxShadow: "0 4px 16px rgba(40, 116, 240, 0.3)",
  },
  cartItems: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  cartItem: {
    backgroundColor: "white",
    padding: "24px",
    borderRadius: "20px",
    display: "flex",
    gap: "24px",
    alignItems: "center",
    boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
    transition: "all 0.2s",
    border: "2px solid transparent",
  },
  itemImage: {
    width: "120px",
    height: "120px",
    backgroundColor: "#f8fafc",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "16px",
    flexShrink: 0,
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#212121",
    marginBottom: "6px",
  },
  itemCategory: {
    fontSize: "13px",
    color: "#878787",
    marginBottom: "12px",
  },
  itemFeatures: {
    display: "flex",
    gap: "16px",
    marginBottom: "12px",
  },
  feature: {
    fontSize: "12px",
    color: "#059669",
    fontWeight: "500",
  },
  itemPriceSection: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  itemPrice: {
    fontSize: "24px",
    fontWeight: "800",
    color: "#212121",
  },
  itemOriginalPrice: {
    fontSize: "16px",
    color: "#878787",
    textDecoration: "line-through",
  },
  itemDiscount: {
    backgroundColor: "#dcfce7",
    color: "#166534",
    padding: "4px 10px",
    borderRadius: "6px",
    fontSize: "12px",
    fontWeight: "700",
  },
  removeButton: {
    backgroundColor: "#fef2f2",
    color: "#dc2626",
    border: "2px solid #fecaca",
    padding: "12px 20px",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    transition: "all 0.2s",
    flexShrink: 0,
  },
  rightColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    alignSelf: "flex-start",
    position: "sticky",
    top: "20px",
  },
  summaryCard: {
    backgroundColor: "white",
    padding: "32px",
    borderRadius: "20px",
    boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
  },
  summaryTitle: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#212121",
    marginBottom: "24px",
  },
  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "16px",
  },
  summaryLabel: {
    fontSize: "15px",
    color: "#64748b",
  },
  summaryValue: {
    fontSize: "15px",
    fontWeight: "600",
    color: "#212121",
  },
  discountValue: {
    fontSize: "15px",
    fontWeight: "600",
    color: "#22c55e",
  },
  freeValue: {
    fontSize: "15px",
    fontWeight: "700",
    color: "#22c55e",
  },
  divider: {
    height: "1px",
    backgroundColor: "#e2e8f0",
    margin: "20px 0",
  },
  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  totalLabel: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#212121",
  },
  totalValue: {
    fontSize: "28px",
    fontWeight: "800",
    color: "#2874f0",
  },
  savingsInfo: {
    backgroundColor: "#dcfce7",
    padding: "12px 16px",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "24px",
    color: "#166534",
    fontSize: "14px",
    fontWeight: "600",
  },
  checkoutButton: {
    width: "100%",
    background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
    color: "white",
    border: "none",
    padding: "18px",
    borderRadius: "12px",
    fontWeight: "700",
    fontSize: "16px",
    cursor: "pointer",
    transition: "all 0.2s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    boxShadow: "0 4px 16px rgba(34, 197, 94, 0.3)",
    marginBottom: "16px",
  },
  secureInfo: {
    textAlign: "center",
    fontSize: "13px",
    color: "#64748b",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
  },
  benefitsCard: {
    backgroundColor: "white",
    padding: "24px",
    borderRadius: "16px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
  },
  benefitsTitle: {
    fontSize: "16px",
    fontWeight: "700",
    color: "#212121",
    marginBottom: "16px",
  },
  benefitsList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  benefitItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "14px",
    color: "#64748b",
  },
  benefitIcon: {
    color: "#22c55e",
    fontWeight: "700",
    fontSize: "16px",
  },
};
