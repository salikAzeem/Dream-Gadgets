import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const [productsCount, setProductsCount] = useState(0);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsRes = await API.get("/products");
        const ordersRes = await API.get("/orders");

        setProductsCount(productsRes.data.length);
        setOrders(ordersRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === "Pending").length;
  const completedOrders = orders.filter(o => o.status === "Completed").length;
  const recentOrders = orders.slice(0, 5);

  if (loading) {
    return <p className="p-6">Loading dashboard...</p>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* SIDEBAR */}
      <div className="w-64 bg-black text-white p-5">
        <h1 className="text-xl font-bold mb-6">
          Dream<span className="text-yellow-400">Gadgets</span>
        </h1>

        <nav className="flex flex-col gap-3">
          <Link to="/admin/dashboard">📊 Dashboard</Link>
          <Link to="/admin/add-product">➕ Add Product</Link>
          <Link to="/admin/products">📦 Products</Link>
          <Link to="/admin/orders">🧾 Orders</Link>
        </nav>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard title="Total Products" value={productsCount} />
          <StatCard title="Total Orders" value={totalOrders} />
          <StatCard title="Pending Orders" value={pendingOrders} />
          <StatCard title="Completed Orders" value={completedOrders} />
        </div>

        {/* RECENT ORDERS */}
        <div className="bg-white rounded shadow p-4">
          <h3 className="text-lg font-bold mb-4">Recent Orders</h3>

          {recentOrders.length === 0 ? (
            <p>No orders yet.</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b">
                  <th className="pb-2">Order ID</th>
                  <th className="pb-2">Total</th>
                  <th className="pb-2">Status</th>
                  <th className="pb-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map(order => (
                  <tr key={order._id} className="border-b">
                    <td className="py-2">#{order._id.slice(-6)}</td>
                    <td>₹{order.totalAmount}</td>
                    <td>
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          order.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <div className="text-right mt-4">
            <Link
              to="/admin/orders"
              className="text-blue-600 hover:underline"
            >
              View all orders →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white rounded shadow p-4">
      <p className="text-gray-500 text-sm">{title}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  );
}
