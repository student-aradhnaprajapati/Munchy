import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./protectedRoutes"; // Adjust path as needed

// User Pages
import Dashboard from "../pages/User/Dashboard.jsx";
import Menu from "../pages/User/Menu.jsx";
import Orders from "../pages/User/Orders.jsx";
import Reviews from "../pages/User/Reviews.jsx";

// Provider Pages
import ProviderDashboard from "../pages/Provider/Dashboard.jsx";
import ManageMenu from "../pages/Provider/ManageMenu.jsx";
import ProviderOrders from "../pages/Provider/Orders.jsx";

// Admin Pages
import AdminDashboard from "../pages/Admin/Dashboard.jsx";
import Users from "../pages/Admin/Users.jsx";
import Providers from "../pages/Admin/Providers.jsx";
import Reports from "../pages/Admin/Reports.jsx";

import Unauthorized from "../pages/Unauthorized.jsx";

const RoleRoutes = ({ userRole }) => {
  return (
    <Routes>
      {/* Default Redirect Based on Role */}
      <Route
        index
        element={
          userRole === "user" ? (
            <Navigate to="/user/dashboard" replace />
          ) : userRole === "provider" ? (
            <Navigate to="/provider/dashboard" replace />
          ) : userRole === "admin" ? (
            <Navigate to="/admin/dashboard" replace />
          ) : (
            <Unauthorized />
          )
        }
      />

      {/* User Routes */}
      <Route
        path="/user/dashboard"
        element={
          <ProtectedRoute role="user">
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user/menu"
        element={
          <ProtectedRoute role="user">
            <Menu />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user/orders"
        element={
          <ProtectedRoute role="user">
            <Orders />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user/reviews"
        element={
          <ProtectedRoute role="user">
            <Reviews />
          </ProtectedRoute>
        }
      />

      {/* Provider Routes */}
      <Route
        path="/provider/dashboard"
        element={
          <ProtectedRoute role="provider">
            <ProviderDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/provider/manage-menu"
        element={
          <ProtectedRoute role="provider">
            <ManageMenu />
          </ProtectedRoute>
        }
      />
      <Route
        path="/provider/orders"
        element={
          <ProtectedRoute role="provider">
            <ProviderOrders />
          </ProtectedRoute>
        }
      />

      {/* Admin Routes */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <ProtectedRoute role="admin">
            <Users />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/providers"
        element={
          <ProtectedRoute role="admin">
            <Providers />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/reports"
        element={
          <ProtectedRoute role="admin">
            <Reports />
          </ProtectedRoute>
        }
      />

      {/* Unauthorized & Fallback */}
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default RoleRoutes;
