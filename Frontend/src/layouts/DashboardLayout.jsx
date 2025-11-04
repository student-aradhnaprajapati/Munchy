// src/layouts/DashboardLayout.jsx
import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";
import Topbar from "../components/Topbar.jsx";
import { AuthContext } from "../context/AuthContext.jsx";

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600 text-lg">
        Loading user info...
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* 🧭 Sidebar */}
      {/* 📄 Main Section */}
      <div className="flex-1 flex flex-col">
        {/* 🔝 Top Navigation Bar */}
        <Topbar />

        {/* 🧩 Page Content Area */}
        <main className="flex-1 p-6 overflow-y-auto bg-gray-50">
          <Outlet />
        </main>
      </div>

      
    </div>
  );
};

export default DashboardLayout;
