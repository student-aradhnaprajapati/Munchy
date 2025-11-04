import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";

const MessDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4">
          Welcome, <span className="text-green-600">{user?.name || "Provider"}</span>
        </h2>
        <p className="text-gray-600 mb-6">
          This is your <strong>Mess Provider Dashboard</strong>. You can manage your menu items, 
          view customer orders, and monitor your performance here.
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate("/provider/manage-menu")}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Manage Menu
          </button>
          <button
            onClick={() => navigate("/provider/orders")}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
          >
            View Orders
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessDashboard;
