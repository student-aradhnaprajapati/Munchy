import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const { user, setUser, setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
    navigate("/login", { replace: true });
  };

  return (
    <header className="bg-white shadow px-6 py-3 flex justify-between items-center">
      <h1 className="text-lg sm:text-xl font-semibold text-gray-700">
         Welcome, {user?.name || "User"}
      </h1>

      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-200"
      >
        Logout
      </button>
    </header>
  );
};

export default Topbar;
