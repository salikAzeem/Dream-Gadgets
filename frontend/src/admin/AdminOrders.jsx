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
    <div className="min-h-screen bg-gray-100 flex">
      {/* SIDEBAR */}
      <aside className="w-64 bg-gray-900 text-white p-6">
        <h1 className="text-xl font-bold mb-8">
          Dream<span className="text-yellow-400">Gadgets</span>
        </h1>

        <nav className="flex flex-col gap-3 text-sm">
          <Link className="hover:text-yellow-400" to="/admin/dashboard">📊 Dashboard</Link>
          <Link className="hover:text-yellow-400" to="/admin/add-product">➕ Add Product</Link>
          <Link className="hover:text-yellow-400" to="/admin/products">📦 Products</Link>
          <Link className="text-yellow-400 font-semibold" to="/admin/orders">🧾 Orders</Link>
        </nav>
      </aside>

      {/* CONTENT */}
      <main className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          🧾 Orders Management
        </h2>

        {loading ? (
          <p>Loading orders...</p>
        ) : orders.length === 0 ? (
          <p className="text-gray-500">No orders yet.</p>
        ) : (
          <div className="bg-white shadow rounded-lg overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 text-gray-600">
                <tr>
                  <th className="p-4 text-left">Order ID</th>
                  <th className="p-4 text-left">Items</th>
                  <th className="p-4 text-left">Total</th>
                  <th className="p-4 text-left">Status</th>
                  <th className="p-4 text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {orders.map(order => (
                  <tr key={order._id} className="border-t hover:bg-gray-50">
                    {/* Order ID */}
                    <td className="p-4 font-semibold">
                      #{order._id.slice(-6)}
                    </td>

                    {/* Items */}
                    <td className="p-4 text-gray-700">
                      <ul className="space-y-1">
                        {order.products.map((p, i) => (
                          <li key={i}>
                            {p.name} × {p.quantity}
                          </li>
                        ))}
                      </ul>
                    </td>

                    {/* Total */}
                    <td className="p-4 font-bold text-green-600">
                      ₹{order.totalAmount}
                    </td>

                    {/* Status */}
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          order.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="p-4 text-center">
                      {order.status === "Pending" ? (
                        <button
                          onClick={() =>
                            updateStatus(order._id, "Completed")
                          }
                          className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded text-xs font-semibold"
                        >
                          Mark Completed
                        </button>
                      ) : (
                        <span className="text-gray-400 text-xs">
                          Completed
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
