import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import LogoutButton from "./LogoutButton.jsx";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <nav className="flex justify-between items-center px-6 py-3 bg-white shadow-md sticky top-0 z-50">
      {/* Logo / Brand */}
      <div
        onClick={() => navigate("/")}
        className="text-2xl font-bold text-orange-600 cursor-pointer"
      >
        🍴 Munchy
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex space-x-6 text-gray-700">
        <Link to="/" className="hover:text-orange-500 transition">
          Home
        </Link>
        <Link to="/menu" className="hover:text-orange-500 transition">
          Menu
        </Link>
        <Link to="/orders" className="hover:text-orange-500 transition">
          Orders
        </Link>
        <Link to="/reviews" className="hover:text-orange-500 transition">
          Reviews
        </Link>
      </div>

      {/* User / Auth Section */}
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span className="text-gray-600 font-medium hidden sm:block">
              Hi, {user.name || "User"}
            </span>
            <LogoutButton />
          </>
        ) : (
          <div className="flex gap-3">
            <Link
              to="/login"
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 border border-orange-500 text-orange-500 rounded-lg hover:bg-orange-100 transition"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
