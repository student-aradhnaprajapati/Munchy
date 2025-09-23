import React from "react";
import { Routes, Route } from "react-router-dom";


import Home from "../pages/student/Home.jsx";
import Menu from "../pages/student/Menu.jsx";
import Orders from "../pages/student/Orders.jsx";
import Dashboard from "../pages/provider/Dashboard.jsx";
import MenuManagement from "../pages/provider/MenuManagement.jsx";
import ProviderOrders from "../pages/provider/Orders.jsx";
import AdminDashboard from "../pages/admin/AdminDashboard.jsx";
import Users from "../pages/admin/Users.jsx";
import Providers from "../pages/admin/Providers.jsx";

function RoleRoutes({ userRole }) {
  return (
    <Routes>
      {userRole === "student" && (
        <>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/orders" element={<Orders />} />
        </>
      )}

      {userRole === "provider" && (
        <>
          <Route path="/" element={<Dashboard />} />
          <Route path="/menu" element={<MenuManagement />} />
          <Route path="/orders" element={<ProviderOrders />} />
        </>
      )}

      {userRole === "admin" && (
        <>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/providers" element={<Providers />} />
        </>
      )}

      <Route
        path="*"
        element={<div className="p-8 text-red-600">Unauthorized</div>}
      />
    </Routes>
  );
}

export default RoleRoutes;
