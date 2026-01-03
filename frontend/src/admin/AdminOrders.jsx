import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders"); // admin-protected
      setOrders(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    await API.patch(`/orders/${id}/status`, { status });
    fetchOrders();
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-black text-white p-5">
        <h1 className="text-xl font-bold mb-6">Dream Gadgets</h1>
        <nav className="flex flex-col gap-3">
          <Link to="/admin/dashboard">🏠 Dashboard</Link>
          <Link to="/admin/add-product">➕ Add Product</Link>
          <Link to="/admin/products">📦 Products</Link>
          <Link to="/admin/orders">🧾 Orders</Link>
        </nav>
      </div>

      {/* Content */}
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-4">Orders</h2>

        {loading ? (
          <p>Loading orders...</p>
        ) : orders.length === 0 ? (
          <p>No orders yet.</p>
        ) : (
          <div className="space-y-4">
            {orders.map(order => (
              <div key={order._id} className="bg-white p-4 rounded shadow">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">
                    Order #{order._id.slice(-6)}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      order.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                <ul className="text-sm text-gray-700 mb-2">
                  {order.products.map((p, i) => (
                    <li key={i}>
                      {p.name} × {p.quantity} — ₹{p.price}
                    </li>
                  ))}
                </ul>

                <div className="flex justify-between items-center">
                  <span className="font-bold">
                    Total: ₹{order.totalAmount}
                  </span>

                  {order.status === "Pending" && (
                    <button
                      onClick={() => updateStatus(order._id, "Completed")}
                      className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                    >
                      Mark Completed
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
