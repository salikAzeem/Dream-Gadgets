import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, User, Sparkles, ArrowRight, CheckCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;
    return strength;
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, password: value });
    setPasswordStrength(calculatePasswordStrength(value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      await signUp(formData.email, formData.password);
      navigate("/");
    } catch (err) {
      setError(err.message || "Failed to create account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 2) return "#ef4444";
    if (passwordStrength < 4) return "#f59e0b";
    return "#22c55e";
  };

  return (
    <div style={styles.container}>
      <div style={styles.leftSection}>
        <div style={styles.logoSection}>
          <div style={styles.logoIcon}>DG</div>
          <h1 style={styles.logoText}>
            Dream<span style={{ color: "#facc15" }}>Gadgets</span>
          </h1>
          <p style={styles.tagline}>Join Our Community Today</p>
        </div>

        <div style={styles.features}>
          <div style={styles.featureItem}>
            <CheckCircle size={24} style={{ color: "#facc15" }} />
            <span>Exclusive member deals</span>
          </div>
          <div style={styles.featureItem}>
            <CheckCircle size={24} style={{ color: "#facc15" }} />
            <span>Fast checkout process</span>
          </div>
          <div style={styles.featureItem}>
            <CheckCircle size={24} style={{ color: "#facc15" }} />
            <span>Track your orders</span>
          </div>
          <div style={styles.featureItem}>
            <CheckCircle size={24} style={{ color: "#facc15" }} />
            <span>Personalized recommendations</span>
          </div>
          <div style={styles.featureItem}>
            <CheckCircle size={24} style={{ color: "#facc15" }} />
            <span>Priority customer support</span>
          </div>
        </div>
      </div>

      <div style={styles.rightSection}>
        <div style={styles.formContainer}>
          <div style={styles.formHeader}>
            <Sparkles size={24} style={{ color: "#2874f0" }} />
            <h2 style={styles.formTitle}>Create Account</h2>
            <p style={styles.formSubtitle}>
              Sign up to start shopping premium gadgets
            </p>
          </div>

          {error && <div style={styles.errorBanner}>{error}</div>}

          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Full Name</label>
              <div style={styles.inputWrapper}>
                <User size={20} style={styles.inputIcon} />
                <input
                  type="text"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  required
                  style={styles.input}
                />
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Email Address</label>
              <div style={styles.inputWrapper}>
                <Mail size={20} style={styles.inputIcon} />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
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
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={handlePasswordChange}
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
              {formData.password && (
                <div style={styles.strengthContainer}>
                  <div style={styles.strengthBars}>
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        style={{
                          ...styles.strengthBar,
                          backgroundColor:
                            i < passwordStrength
                              ? getPasswordStrengthColor()
                              : "#e2e8f0",
                        }}
                      />
                    ))}
                  </div>
                  <span style={styles.strengthText}>
                    {passwordStrength < 2
                      ? "Weak"
                      : passwordStrength < 4
                      ? "Medium"
                      : "Strong"}
                  </span>
                </div>
              )}
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Confirm Password</label>
              <div style={styles.inputWrapper}>
                <Lock size={20} style={styles.inputIcon} />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, confirmPassword: e.target.value })
                  }
                  required
                  style={styles.input}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={styles.toggleButton}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>

            <label style={styles.termsLabel}>
              <input type="checkbox" required style={styles.checkbox} />
              <span>
                I agree to the{" "}
                <a href="#" style={styles.termsLink}>
                  Terms & Conditions
                </a>{" "}
                and{" "}
                <a href="#" style={styles.termsLink}>
                  Privacy Policy
                </a>
              </span>
            </label>

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
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          <div style={styles.divider}>
            <span style={styles.dividerText}>Already have an account?</span>
          </div>

          <Link to="/login" style={styles.loginLink}>
            Sign in here
          </Link>

          <div style={styles.securityBadge}>
            <span>🔒</span>
            <span>Your data is encrypted and secure</span>
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
  features: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  featureItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    fontSize: "15px",
    fontWeight: "500",
  },
  rightSection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px",
    backgroundColor: "white",
    overflowY: "auto",
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
    gap: "16px",
    marginBottom: "24px",
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
  strengthContainer: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginTop: "4px",
  },
  strengthBars: {
    display: "flex",
    gap: "4px",
    flex: 1,
  },
  strengthBar: {
    flex: 1,
    height: "4px",
    borderRadius: "2px",
    transition: "background-color 0.2s",
  },
  strengthText: {
    fontSize: "12px",
    fontWeight: "600",
    color: "#64748b",
    minWidth: "50px",
  },
  termsLabel: {
    display: "flex",
    alignItems: "flex-start",
    gap: "10px",
    fontSize: "13px",
    color: "#64748b",
    fontWeight: "500",
    cursor: "pointer",
    marginTop: "4px",
  },
  checkbox: {
    width: "18px",
    height: "18px",
    cursor: "pointer",
    accentColor: "#2874f0",
    marginTop: "2px",
    flexShrink: 0,
  },
  termsLink: {
    color: "#2874f0",
    textDecoration: "none",
    fontWeight: "700",
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
    marginTop: "8px",
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
    marginBottom: "16px",
    fontSize: "14px",
    color: "#94a3b8",
    fontWeight: "500",
  },
  dividerText: {
    backgroundColor: "white",
    padding: "0 12px",
  },
  loginLink: {
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
    marginBottom: "20px",
  },
  securityBadge: {
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
