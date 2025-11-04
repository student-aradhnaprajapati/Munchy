import React, { useEffect, useState } from "react";
import { getOrders } from "../../services/orderService.js";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const Reports = () => {
  const [orders, setOrders] = useState([]);

  // Fetch orders on mount
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrders();
        setOrders(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("❌ Error fetching orders:", error);
        setOrders([]);
      }
    };
    fetchOrders();
  }, []);

  // --- Key Metrics ---
  const totalOrders = orders.length;

  const totalRevenue = orders.reduce(
    (sum, order) => sum + (Number(order.total_price) || 0),
    0
  );

  const totalSales = orders.reduce(
    (sum, order) =>
      sum + (Number(order.price) || 0) * (Number(order.quantity) || 0),
    0
  );

  // --- Popular Items ---
  const popularItems = orders.reduce((acc, order) => {
    const item = order.menu_item_name || "Unknown Item";
    acc[item] = (acc[item] || 0) + (order.quantity || 0);
    return acc;
  }, {});

  const chartData = Object.entries(popularItems).map(([name, count]) => ({
    name,
    orders: count,
  }));

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-700">
        📊 Reports & Analytics
      </h1>

      {/* --- Summary Cards --- */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <h2 className="text-gray-500 text-sm font-semibold">Total Orders</h2>
          <p className="text-3xl font-bold text-indigo-700 mt-2">
            {totalOrders}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <h2 className="text-gray-500 text-sm font-semibold">Total Sales</h2>
          <p className="text-3xl font-bold text-green-600 mt-2">
            ₹{totalSales.toLocaleString()}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <h2 className="text-gray-500 text-sm font-semibold">
            Total Revenue
          </h2>
          <p className="text-3xl font-bold text-blue-600 mt-2">
            ₹{totalRevenue.toLocaleString()}
          </p>
        </div>
      </div>

      {/* --- Popular Items Chart --- */}
      <div className="bg-white p-6 rounded-2xl shadow mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          🥗 Popular Menu Items
        </h2>
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="orders" fill="#6366f1" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-gray-500 text-center italic">
            No data available for chart
          </p>
        )}
      </div>

      {/* --- Orders Table --- */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          🧾 Recent Orders
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left border">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="py-2 px-3 border">#</th>
                <th className="py-2 px-3 border">Menu Item</th>
                <th className="py-2 px-3 border">Quantity</th>
                <th className="py-2 px-3 border">Price</th>
                <th className="py-2 px-3 border">Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((o, i) => (
                  <tr
                    key={o.id || o._id || i}
                    className="hover:bg-gray-100 transition border-b"
                  >
                    <td className="py-2 px-3 border">{i + 1}</td>
                    <td className="py-2 px-3 border">
                      {o.menu_item_name || "N/A"}
                    </td>
                    <td className="py-2 px-3 border">{o.quantity || 0}</td>
                    <td className="py-2 px-3 border">
                      ₹{Number(o.price || 0).toFixed(2)}
                    </td>
                    <td className="py-2 px-3 border font-semibold">
                      ₹{(
                        (Number(o.price) || 0) * (Number(o.quantity) || 0)
                      ).toFixed(2)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-4 text-gray-500 italic"
                  >
                    No orders available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;
