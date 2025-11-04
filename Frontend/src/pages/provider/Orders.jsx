import React, { useEffect, useState } from "react";
import { getOrders, updateOrderStatus } from "../../services/orderService.js";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await getOrders();
      setOrders(data || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setMessage("Failed to load orders. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (id, status) => {
    if (!window.confirm(`Are you sure you want to ${status} this order?`)) return;

    try {
      setLoading(true);
      await updateOrderStatus(id, status);
      setMessage(`Order ${status} successfully!`);
      fetchOrders();
    } catch (error) {
      console.error("Error updating order:", error);
      setMessage("Failed to update order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-700">
        Incoming Orders
      </h1>

      <div className="bg-white p-6 rounded-2xl shadow-md max-w-5xl mx-auto">
        {message && (
          <div className="mb-4 text-center text-sm text-gray-700 bg-indigo-50 border border-indigo-200 p-2 rounded-lg">
            {message}
          </div>
        )}

        {loading ? (
          <p className="text-center text-gray-500 py-6">Loading orders...</p>
        ) : orders.length > 0 ? (
          <table className="min-w-full border-collapse">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="py-3 px-4 text-left rounded-tl-lg">Order ID</th>
                <th className="py-3 px-4 text-left">Customer</th>
                <th className="py-3 px-4 text-left">Total (₹)</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-center rounded-tr-lg">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="py-3 px-4 font-medium text-gray-800">
                    #{order.id}
                  </td>
                  <td className="py-3 px-4 text-gray-700">{order.user_name}</td>
                  <td className="py-3 px-4 text-gray-700">{order.total_price}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        order.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : order.status === "accepted"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    {order.status === "pending" ? (
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleUpdate(order.id, "accepted")}
                          className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-green-600 transition"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleUpdate(order.id, "cancelled")}
                          className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-600 transition"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <span className="text-gray-500 italic text-sm">
                        No actions
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-500 py-6">
            No incoming orders found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Orders;
