import React from "react";

function Orders() {
  const orders = [
    { id: 1, item: "Veg Biryani", status: "Delivered" },
    { id: 2, item: "Paneer Butter Masala", status: "Preparing" },
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">My Orders</h1>
      <ul className="space-y-4">
        {orders.map(order => (
          <li key={order.id} className="p-4 bg-white shadow rounded flex justify-between">
            <span>{order.item}</span>
            <span className={order.status === "Delivered" ? "text-green-600" : "text-yellow-600"}>
              {order.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Orders;
