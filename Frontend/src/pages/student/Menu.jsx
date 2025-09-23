import React from "react";

function Menu() {
  const menuItems = [
    { name: "Paneer Butter Masala", price: 120 },
    { name: "Veg Biryani", price: 100 },
    { name: "Chapati + Sabzi", price: 80 },
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Today’s Menu</h1>
      <ul className="space-y-4">
        {menuItems.map((item, index) => (
          <li key={index} className="p-4 bg-white shadow rounded flex justify-between">
            <span>{item.name}</span>
            <span>₹{item.price}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Menu;
