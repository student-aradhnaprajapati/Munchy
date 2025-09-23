import React from "react";

function AdminDashboard() {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-red-600 mb-6">Admin Dashboard</h1>
      <p className="text-gray-700 mb-4">Manage students and providers effectively.</p>
      <div className="flex gap-4">
        <button className="px-6 py-3 bg-red-500 text-white rounded hover:bg-red-600">
          Manage Users
        </button>
        <button className="px-6 py-3 bg-yellow-500 text-white rounded hover:bg-yellow-600">
          Manage Providers
        </button>
      </div>
    </div>
  );
}

export default AdminDashboard;
