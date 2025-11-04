// src/pages/Dashboard/UserDashboard.jsx
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getData } from "../../api";

const UserDashboard = () => {
  const { user, token } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getData(`/orders/user/${user?.id}`, token);
        setOrders(response.orders || []);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    if (user?.id) fetchOrders();
  }, [token, user]);

  return (
    <div className="flex flex-col items-center justify-start min-h-[80vh] text-gray-800 p-6">
      {/* Greeting */}
      <h2 className="text-3xl font-semibold mb-4 text-gray-900">
        Hi, {user?.name || "User"} 👋
      </h2>

      {/* Profile Section */}
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-3xl mb-8 border border-gray-200 flex flex-col sm:flex-row items-center gap-6">
        <img
          src={user?.profilePic || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
          alt="Profile"
          className="w-24 h-24 rounded-full border-4 border-blue-400 shadow-md object-cover"
        />
        <div className="text-center sm:text-left">
          <p className="text-gray-600">{user?.email}</p>
          <p className="text-sm text-blue-600 font-medium capitalize">
            Role: {user?.role}
          </p>
        </div>
      </div>

      {/* Orders Section */}
      <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-4xl border border-gray-200">
        <h3 className="text-2xl font-semibold mb-4 text-center sm:text-left text-gray-800">
          My Order History
        </h3>

        {loading ? (
          <p className="text-gray-500 text-center">Loading your orders...</p>
        ) : orders.length === 0 ? (
          <p className="text-gray-500 text-center">
            You haven’t placed any orders yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-700 text-left">
                  <th className="p-3">#</th>
                  <th className="p-3">Item</th>
                  <th className="p-3">Quantity</th>
                  <th className="p-3">Total (₹)</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={order.id || index} className="border-t hover:bg-gray-50">
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3">{order.itemName}</td>
                    <td className="p-3">{order.quantity}</td>
                    <td className="p-3 font-semibold">₹{order.total}</td>
                    <td
                      className={`p-3 font-medium ${
                        order.status === "Delivered"
                          ? "text-green-600"
                          : order.status === "Pending"
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {order.status}
                    </td>
                    <td className="p-3">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
