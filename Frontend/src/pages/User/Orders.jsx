// src/pages/User/Orders.jsx
import React, { useEffect, useState, useContext } from "react";
import { getUserOrders } from "../../services/orderService.js";
import { AuthContext } from "../../context/AuthContext.jsx";
import { FaCheckCircle, FaClock, FaTimesCircle } from "react-icons/fa";

const Orders = () => {
  const { user } = useContext(AuthContext); // ✅ get user
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user?.id) return; // Wait until user is loaded

    const fetchOrders = async () => {
      try {
        const data = await getUserOrders(user.id); // ✅ pass user.id
        console.log("📦 Orders API Data:", data);

        // ✅ Handle cases when backend sends an object instead of array
        if (Array.isArray(data)) {
          setOrders(data);
        } else if (Array.isArray(data.orders)) {
          setOrders(data.orders);
        } else {
          console.warn("⚠️ Unexpected API response shape:", data);
          setOrders([]);
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Failed to load orders. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  const getStatusIcon = (status) => {
    const normalized = status?.toLowerCase();
    switch (normalized) {
      case "delivered":
        return <FaCheckCircle className="text-green-600 text-xl" />;
      case "pending":
        return <FaClock className="text-yellow-500 text-xl" />;
      case "cancelled":
        return <FaTimesCircle className="text-red-500 text-xl" />;
      default:
        return <FaClock className="text-gray-400 text-xl" />;
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-600 text-lg">
        Loading orders...
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex justify-center items-center text-red-500 font-medium">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">📦 My Orders</h1>

        {!Array.isArray(orders) || orders.length === 0 ? (
          <div className="text-center text-gray-500 py-10">
            You haven’t placed any orders yet.
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="border rounded-xl p-5 shadow-sm hover:shadow-md transition bg-gray-50"
              >
                {/* Header */}
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-xl font-semibold text-gray-700">
                    Order #{order.id}
                  </h2>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(order.status)}
                    <span
                      className={`font-medium ${
                        order.status?.toLowerCase() === "delivered"
                          ? "text-green-700"
                          : order.status?.toLowerCase() === "pending"
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>

                {/* Meta Info */}
                <p className="text-gray-500 text-sm mb-2">
                  Placed on:{" "}
                  <span className="text-gray-700 font-medium">
                    {new Date(order.created_at).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </p>

                {/* Total */}
                <div className="flex justify-between items-center mt-4 border-t pt-3">
                  <span className="font-semibold text-gray-600">
                    Total Amount:
                  </span>
                  <span className="text-xl font-bold text-green-700">
                    ₹{Number(order.total_price).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
