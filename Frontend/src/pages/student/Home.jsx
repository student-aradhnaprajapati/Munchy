import React from "react";

function Home() {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">Welcome, Student!</h1>
      <p className="text-gray-700 mb-4">Check today’s menu or track your orders.</p>
      <div className="flex gap-4">
        <button className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600">
          View Menu
        </button>
        <button className="px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600">
          My Orders
        </button>
      </div>
    </div>
  );
}

export default Home;
