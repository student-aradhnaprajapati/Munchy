import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children, role, allowedRoles = [] }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  // Merge single role prop into allowedRoles array
  const roles = role ? [role] : allowedRoles;

  // ⏳ Show loader while checking authentication
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600" />
      </div>
    );
  }

  // 🚫 If no user, redirect to login
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // ⚠️ If user’s role is not allowed, redirect to home
  if (roles.length > 0 && !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  // ✅ Allow access
  return children;
};

export default ProtectedRoute;
