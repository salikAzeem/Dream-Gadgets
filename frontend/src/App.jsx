import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// User Pages
import Home from "./pages/Home";
import Cart from "./pages/Cart";

// Admin Pages
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import AddProduct from "./admin/AddProduct";
import ProductList from "./admin/ProductList";
import AdminOrders from "./admin/AdminOrders"; // ✅ MISSING IMPORT FIXED

// 🔐 Admin Route Protection
const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("adminToken");
  return token ? children : <Navigate to="/admin/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* USER ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />

        {/* ADMIN LOGIN (PUBLIC) */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* ADMIN ORDERS */}
        <Route
          path="/admin/orders"
          element={
            <AdminRoute>
              <AdminOrders />
            </AdminRoute>
          }
        />

        {/* ADMIN DASHBOARD */}
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        {/* ADD PRODUCT */}
        <Route
          path="/admin/add-product"
          element={
            <AdminRoute>
              <AddProduct />
            </AdminRoute>
          }
        />

        {/* VIEW PRODUCTS */}
        <Route
          path="/admin/products"
          element={
            <AdminRoute>
              <ProductList />
            </AdminRoute>
          }
        />

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/admin/login" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
