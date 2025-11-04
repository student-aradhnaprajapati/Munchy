import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";

const AdminDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      logout();
      navigate("/login");
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen text-lg text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col items-center justify-center min-h-[80vh] text-gray-800">
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-2xl text-center border border-gray-200">
          <h2 className="text-3xl font-bold mb-3">
            Welcome,{" "}
            <span className="text-purple-600">{user?.name || "Admin"}</span>
          </h2>

          <p className="text-gray-600 mb-6">
            This is your <strong>Admin Dashboard</strong>. Manage users, mess
            providers, and customer reviews from here.
          </p>

          {/* Stats Overview Section */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-purple-100 p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-purple-700">Users</h3>
              <p className="text-2xl font-bold mt-1">128</p>
            </div>
            <div className="bg-green-100 p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-green-700">Providers</h3>
              <p className="text-2xl font-bold mt-1">34</p>
            </div>
            <div className="bg-yellow-100 p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-yellow-700">Reviews</h3>
              <p className="text-2xl font-bold mt-1">240</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => navigate("/admin/manage-users")}
              className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Manage Users
            </button>
            <button
              onClick={() => navigate("/admin/manage-mess")}
              className="bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600 transition"
            >
              Manage Providers
            </button>
            <button
              onClick={() => navigate("/admin/reviews")}
              className="bg-yellow-500 text-white px-5 py-2 rounded-lg hover:bg-yellow-600 transition"
            >
              View Reviews
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
