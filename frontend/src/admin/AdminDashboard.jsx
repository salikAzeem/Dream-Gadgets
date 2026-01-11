import { useEffect, useState } from "react";
import API from "../services/api";
import { Link, useLocation } from "react-router-dom";

export default function AdminDashboard() {
  const [productsCount, setProductsCount] = useState(0);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();

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
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-6 text-xl font-bold border-b border-gray-700">
          Dream<span className="text-yellow-400">Gadgets</span>
        </div>

        <nav className="flex-1 p-4 space-y-2 text-sm">
          <SidebarLink to="/admin/dashboard" label="Dashboard" icon="📊" active={location.pathname} />
          <SidebarLink to="/admin/add-product" label="Add Product" icon="➕" active={location.pathname} />
          <SidebarLink to="/admin/products" label="Products" icon="📦" active={location.pathname} />
          <SidebarLink to="/admin/orders" label="Orders" icon="🧾" active={location.pathname} />
        </nav>

        <div className="p-4 border-t border-gray-700 text-xs text-gray-400">
          Admin Panel
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1">
        {/* TOP BAR */}
        <div className="bg-white shadow px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">Dashboard</h2>
          <span className="text-sm text-gray-500">Welcome, Admin</span>
        </div>

        <div className="p-6">
          {/* STATS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard title="Total Products" value={productsCount} color="bg-blue-100 text-blue-700" />
            <StatCard title="Total Orders" value={totalOrders} color="bg-purple-100 text-purple-700" />
            <StatCard title="Pending Orders" value={pendingOrders} color="bg-yellow-100 text-yellow-700" />
            <StatCard title="Completed Orders" value={completedOrders} color="bg-green-100 text-green-700" />
          </div>

          {/* RECENT ORDERS */}
          <div className="bg-white rounded shadow">
            <div className="p-4 border-b font-semibold">
              Recent Orders
            </div>

            {recentOrders.length === 0 ? (
              <p className="p-4 text-gray-500">No orders yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 text-gray-600">
                    <tr>
                      <th className="px-4 py-3 text-left">Order ID</th>
                      <th className="px-4 py-3 text-left">Total</th>
                      <th className="px-4 py-3 text-left">Status</th>
                      <th className="px-4 py-3 text-left">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map(order => (
                      <tr key={order._id} className="border-t hover:bg-gray-50">
                        <td className="px-4 py-2">#{order._id.slice(-6)}</td>
                        <td className="px-4 py-2">₹{order.totalAmount}</td>
                        <td className="px-4 py-2">
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
                        <td className="px-4 py-2">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="p-4 text-right">
              <Link to="/admin/orders" className="text-blue-600 hover:underline text-sm">
                View all orders →
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

/* ---------- Components ---------- */

function SidebarLink({ to, label, icon, active }) {
  const isActive = active === to;
  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-4 py-2 rounded ${
        isActive
          ? "bg-gray-800 text-yellow-400"
          : "hover:bg-gray-800"
      }`}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </Link>
  );
}

function StatCard({ title, value, color }) {
  return (
    <div className={`rounded shadow p-4 ${color}`}>
      <p className="text-sm">{title}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  );
}
