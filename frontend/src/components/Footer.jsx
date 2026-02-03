import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        {/* BRAND */}
        <div style={styles.col}>
          <h3 style={styles.logo}>
            <span style={styles.logoIcon}>DG</span>
            Dream<span style={{ color: "#facc15" }}>Gadgets</span>
          </h3>
          <p style={styles.text}>
            Your trusted destination for premium gadgets and accessories.
            Quality products, fast delivery, and great support.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div style={styles.col}>
          <h4 style={styles.heading}>Quick Links</h4>
          <Link to="/about" style={styles.link}>About Us</Link>
          <Link to="/contact" style={styles.link}>Contact</Link>
          <Link to="/shipping" style={styles.link}>Shipping</Link>
        </div>

        {/* POLICIES */}
        <div style={styles.col}>
          <h4 style={styles.heading}>Policies</h4>
          <Link to="/terms" style={styles.link}>Terms & Conditions</Link>
          <Link to="/privacy" style={styles.link}>Privacy Policy</Link>
          <Link to="/returns" style={styles.link}>Return Policy</Link>
          <Link to="/cancellation" style={styles.link}>Cancellation</Link>
        </div>

        {/* CONTACT */}
        <div style={styles.col}>
          <h4 style={styles.heading}>Contact</h4>
          <p style={styles.text}><Phone size={14} /> +91 9797001696</p>
          <p style={styles.text}><Mail size={14} /> parvaizahmadbhat128@gmail.com</p>
          <p style={styles.text}><MapPin size={14} /> Old Bus Stand, Maintown Budgam,India</p>
        </div>
      </div>

      <div style={styles.bottom}>
        © {new Date().getFullYear()} DreamGadgets. All rights reserved.
      </div>
    </footer>
  );
}

/* ================= STYLES ================= */

const isMobile = window.innerWidth <= 768;

const styles = {
  footer: {
    background: "#020617",
    color: "#fff",
    marginTop: "60px",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: isMobile ? "24px 16px" : "40px 20px",
    display: "grid",
    gridTemplateColumns: isMobile ? "1fr" : "repeat(4, 1fr)",
    gap: "30px",
  },
  col: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  logo: {
    fontSize: isMobile ? "20px" : "22px",
    fontWeight: 700,
  },
  logoIcon: {
    background: "#facc15",
    color: "#000",
    padding: "4px 8px",
    borderRadius: "8px",
    marginRight: "6px",
  },
  heading: {
    fontSize: "16px",
    fontWeight: 700,
    marginBottom: "6px",
  },
  link: {
    color: "#cbd5f5",
    textDecoration: "none",
    fontSize: "14px",
  },
  text: {
    color: "#cbd5f5",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    lineHeight: "1.6",
  },
  bottom: {
    borderTop: "1px solid #1e293b",
    textAlign: "center",
    padding: "12px",
    fontSize: "13px",
    color: "#94a3b8",
  },
};
