import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, Sparkles, ArrowRight } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signIn(email, password);
      navigate("/");
    } catch (err) {
      setError(err.message || "Failed to login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.leftSection}>
        <div style={styles.logoSection}>
          <div style={styles.logoIcon}>DG</div>
          <h1 style={styles.logoText}>
            Dream<span style={{ color: "#facc15" }}>Gadgets</span>
          </h1>
          <p style={styles.tagline}>Your Premier Tech Destination</p>
        </div>

        <div style={styles.benefits}>
          <div style={styles.benefitItem}>
            <div style={styles.benefitIcon}>🚚</div>
            <div>
              <div style={styles.benefitTitle}>Free Delivery</div>
              <div style={styles.benefitText}>On all orders nationwide</div>
            </div>
          </div>

          <div style={styles.benefitItem}>
            <div style={styles.benefitIcon}>💳</div>
            <div>
              <div style={styles.benefitTitle}>Secure Payments</div>
              <div style={styles.benefitText}>100% safe transactions</div>
            </div>
          </div>

          <div style={styles.benefitItem}>
            <div style={styles.benefitIcon}>📱</div>
            <div>
              <div style={styles.benefitTitle}>Premium Products</div>
              <div style={styles.benefitText}>Latest gadgets & accessories</div>
            </div>
          </div>

          <div style={styles.benefitItem}>
            <div style={styles.benefitIcon}>⭐</div>
            <div>
              <div style={styles.benefitTitle}>24/7 Support</div>
              <div style={styles.benefitText}>Customer care always ready</div>
            </div>
          </div>
        </div>
      </div>

      <div style={styles.rightSection}>
        <div style={styles.formContainer}>
          <div style={styles.formHeader}>
            <Sparkles size={24} style={{ color: "#2874f0" }} />
            <h2 style={styles.formTitle}>Welcome Back</h2>
            <p style={styles.formSubtitle}>
              Sign in to your DreamGadgets account
            </p>
          </div>

          {error && <div style={styles.errorBanner}>{error}</div>}

          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Email Address</label>
              <div style={styles.inputWrapper}>
                <Mail size={20} style={styles.inputIcon} />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={styles.input}
                />
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Password</label>
              <div style={styles.inputWrapper}>
                <Lock size={20} style={styles.inputIcon} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={styles.input}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={styles.toggleButton}
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>

            <div style={styles.rememberForgot}>
              <label style={styles.rememberLabel}>
                <input type="checkbox" style={styles.checkbox} />
                <span>Remember me</span>
              </label>
              <Link to="/forgot-password" style={styles.forgotLink}>
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                ...styles.submitButton,
                opacity: loading ? 0.7 : 1,
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? (
                <>
                  <div style={styles.buttonSpinner}></div>
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          <div style={styles.divider}>
            <span style={styles.dividerText}>Don't have an account?</span>
          </div>

          <Link to="/signup" style={styles.signupLink}>
            Create an account
          </Link>

          <div style={styles.securityBadge}>
            <span>🔒</span>
            <span>Your data is secure with us</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    minHeight: "100vh",
    backgroundColor: "#f8fafc",
  },
  leftSection: {
    background: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 50%, #3b82f6 100%)",
    padding: "60px 40px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    color: "white",
    position: "relative",
    overflow: "hidden",
  },
  logoSection: {
    marginBottom: "60px",
  },
  logoIcon: {
    width: "56px",
    height: "56px",
    background: "linear-gradient(135deg, #facc15 0%, #f59e0b 100%)",
    borderRadius: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: "24px",
    color: "#1e3a8a",
    marginBottom: "16px",
    boxShadow: "0 8px 24px rgba(250, 204, 21, 0.3)",
  },
  logoText: {
    fontSize: "40px",
    fontWeight: "800",
    lineHeight: "1.2",
    marginBottom: "8px",
  },
  tagline: {
    fontSize: "16px",
    opacity: 0.9,
    fontWeight: "500",
  },
  benefits: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  benefitItem: {
    display: "flex",
    gap: "16px",
    backgroundColor: "rgba(255,255,255,0.1)",
    padding: "20px 24px",
    borderRadius: "16px",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255,255,255,0.2)",
  },
  benefitIcon: {
    fontSize: "32px",
    minWidth: "48px",
  },
  benefitTitle: {
    fontSize: "16px",
    fontWeight: "700",
    marginBottom: "4px",
  },
  benefitText: {
    fontSize: "13px",
    opacity: 0.85,
  },
  rightSection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px",
    backgroundColor: "white",
  },
  formContainer: {
    width: "100%",
    maxWidth: "420px",
  },
  formHeader: {
    textAlign: "center",
    marginBottom: "40px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "12px",
  },
  formTitle: {
    fontSize: "32px",
    fontWeight: "800",
    color: "#212121",
  },
  formSubtitle: {
    fontSize: "15px",
    color: "#64748b",
    fontWeight: "500",
  },
  errorBanner: {
    backgroundColor: "#fee2e2",
    color: "#991b1b",
    padding: "12px 16px",
    borderRadius: "12px",
    marginBottom: "24px",
    fontSize: "14px",
    fontWeight: "600",
    border: "1px solid #fecaca",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    marginBottom: "28px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  label: {
    fontSize: "14px",
    fontWeight: "700",
    color: "#212121",
  },
  inputWrapper: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  inputIcon: {
    position: "absolute",
    left: "16px",
    color: "#94a3b8",
    pointerEvents: "none",
  },
  input: {
    width: "100%",
    padding: "14px 16px 14px 48px",
    border: "2px solid #e2e8f0",
    borderRadius: "12px",
    fontSize: "15px",
    outline: "none",
    transition: "all 0.2s",
  },
  toggleButton: {
    position: "absolute",
    right: "12px",
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#94a3b8",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  rememberForgot: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "14px",
  },
  rememberLabel: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer",
    color: "#64748b",
    fontWeight: "500",
  },
  checkbox: {
    width: "18px",
    height: "18px",
    cursor: "pointer",
    accentColor: "#2874f0",
  },
  forgotLink: {
    color: "#2874f0",
    textDecoration: "none",
    fontWeight: "600",
  },
  submitButton: {
    background: "linear-gradient(135deg, #2874f0 0%, #1e3a8a 100%)",
    color: "white",
    border: "none",
    padding: "16px",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.2s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    boxShadow: "0 4px 16px rgba(40, 116, 240, 0.3)",
  },
  buttonSpinner: {
    width: "18px",
    height: "18px",
    border: "2px solid rgba(255,255,255,0.3)",
    borderTop: "2px solid white",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },
  divider: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "14px",
    color: "#94a3b8",
    fontWeight: "500",
  },
  dividerText: {
    backgroundColor: "white",
    padding: "0 12px",
  },
  signupLink: {
    display: "block",
    width: "100%",
    padding: "14px",
    backgroundColor: "#f8fafc",
    color: "#2874f0",
    border: "2px solid #2874f0",
    borderRadius: "12px",
    textAlign: "center",
    textDecoration: "none",
    fontWeight: "700",
    fontSize: "16px",
    transition: "all 0.2s",
    cursor: "pointer",
  },
  securityBadge: {
    marginTop: "24px",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    fontSize: "13px",
    color: "#64748b",
    fontWeight: "600",
  },
};
// 📱 MOBILE RESPONSIVE PATCH
const mobile = window.innerWidth <= 768;

if (mobile) {
  styles.container = {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  };

  styles.leftSection = {
    ...styles.leftSection,
    padding: "30px 20px",
    minHeight: "220px",
  };

  styles.logoText = {
    ...styles.logoText,
    fontSize: "28px",
  };

  styles.features = {
    display: "none", // hide left features on mobile
  };

  styles.rightSection = {
    ...styles.rightSection,
    padding: "20px",
  };

  styles.formTitle = {
    ...styles.formTitle,
    fontSize: "26px",
  };

  styles.submitButton = {
    ...styles.submitButton,
    padding: "14px",
    fontSize: "15px",
  };
}
