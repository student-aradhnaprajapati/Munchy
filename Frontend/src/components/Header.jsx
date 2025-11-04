import React from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Header() {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="bg-gray-900 text-gray-100 shadow-md">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo / App Name */}
        <h1
          className="text-2xl font-bold text-orange-400 cursor-pointer"
          onClick={() => navigate("/")}
        >
          Munchy
        </h1>

        {/* Right side - user info and logout */}
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="text-sm">
                Welcome, <span className="font-semibold text-orange-300">{user.name}</span>
              </span>
              <button
                onClick={logout}
                className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded-md text-sm transition"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded-md text-sm transition"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
