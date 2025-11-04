// src/routes.jsx
import { Routes, Route, Navigate } from "react-router-dom";

// 🌐 Common Pages
import Landing from "./pages/Common/Landing";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

// 🧭 Layout & Route Guard
import DashboardLayout from "./layouts/DashboardLayout";
import ProtectedRoute from "./routes/ProtectedRoute";

// 👤 User Pages
import UserDashboard from "./pages/Dashboard/UserDashboard";
import Menu from "./pages/User/Menu";
import Orders from "./pages/User/Orders";
import Reviews from "./pages/User/Reviews";

// 🍳 Provider Pages
import MessDashboard from "./pages/Dashboard/MessDashboard";
import ManageMenu from "./pages/Provider/ManageMenu";
import ProviderOrders from "./pages/Provider/Orders";

// 🧑‍⚖️ Admin Pages
import AdminDashboard from "./pages/Dashboard/AdminDashboard";
import Users from "./pages/Admin/Users";
import Providers from "./pages/Admin/Providers";
import Reports from "./pages/Admin/Reports";

function AppRoutes() {
  return (
    <Routes>
      {/* 🌍 Public Routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* 👤 USER ROUTES */}
      <Route
        path="/user/*"
        element={
          <ProtectedRoute role="user">
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<UserDashboard />} />
        <Route path="menu" element={<Menu />} />
        <Route path="orders" element={<Orders />} />
        <Route path="reviews" element={<Reviews />} />
      </Route>

      {/* 🍳 PROVIDER ROUTES */}
      <Route
        path="/provider/*"
        element={
          <ProtectedRoute role="provider">
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<MessDashboard />} />
        <Route path="manage-menu" element={<ManageMenu />} />
        <Route path="orders" element={<ProviderOrders />} />
      </Route>

      {/* 🧑‍⚖️ ADMIN ROUTES */}
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute role="admin">
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="providers" element={<Providers />} />
        <Route path="reports" element={<Reports />} />
      </Route>

      {/* 🚫 Fallback Redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes;
