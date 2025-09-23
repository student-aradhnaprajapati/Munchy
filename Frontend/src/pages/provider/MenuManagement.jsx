import React from "react";

function MenuManagement() {
  const menuItems = [
    { name: "Veg Biryani", price: 100 },
    { name: "Paneer Butter Masala", price: 120 },
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-purple-600 mb-6">Menu Management</h1>
      <ul className="space-y-4">
        {menuItems.map((item, index) => (
          <li key={index} className="p-4 bg-white shadow rounded flex justify-between">
            <span>{item.name}</span>
            <span>₹{item.price}</span>
            <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
              Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MenuManagement;
