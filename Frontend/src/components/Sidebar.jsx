// src/components/Sidebar.jsx
import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {
  FiMenu,
  FiLogOut,
  FiUser,
  FiHome,
  FiList,
  FiShoppingBag,
  FiStar,
} from "react-icons/fi";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

const Sidebar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  // Handle Logout
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // 🧭 Role-based menu config
  const menuItems = {
    user: [
      { name: "Dashboard", icon: <FiHome />, path: "/user" },
      { name: "Menu", icon: <FiList />, path: "/user/menu" },
      { name: "Orders", icon: <FiShoppingBag />, path: "/user/orders" },
      { name: "Reviews", icon: <FiStar />, path: "/user/reviews" },
    ],
    provider: [
      { name: "Dashboard", icon: <FiHome />, path: "/provider" },
      { name: "Manage Menu", icon: <FiList />, path: "/provider/manage-menu" },
      { name: "Orders", icon: <FiShoppingBag />, path: "/provider/orders" },
    ],
    admin: [
      {
        name: "Dashboard",
        icon: <MdOutlineAdminPanelSettings />,
        path: "/admin",
      },
      { name: "Users", icon: <FiUser />, path: "/admin/users" },
      { name: "Providers", icon: <FiList />, path: "/admin/providers" },
      { name: "Reports", icon: <FiStar />, path: "/admin/reports" },
    ],
  };

  const currentMenu = menuItems[user?.role] || [];

  return (
    <div
      className={`${
        isOpen ? "w-64" : "w-20"
      } bg-white h-screen p-5 pt-8 relative duration-300 shadow-lg border-r`}
    >
      {/* Toggle Button */}
      <FiMenu
        className="absolute cursor-pointer -right-3 top-9 w-7 h-7 bg-orange-500 text-white rounded-full"
        onClick={() => setIsOpen(!isOpen)}
      />

      {/* Logo */}
      <div className="flex items-center gap-x-3 mb-8">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3595/3595455.png"
          alt="logo"
          className="w-8 h-8"
        />
        {isOpen && (
          <h1 className="text-xl font-bold text-orange-600 tracking-wide">
            Munchy
          </h1>
        )}
      </div>

      {/* Navigation */}
      <ul className="pt-4 space-y-2">
        {currentMenu.map((item, index) => (
          <li key={index}>
            <NavLink
              to={item.path}
              end
              className={({ isActive }) =>
                `flex items-center gap-x-3 p-3 rounded-md transition-all duration-200 ${
                  isActive
                    ? "bg-orange-200 text-orange-700 font-semibold"
                    : "text-gray-700 hover:bg-orange-100 hover:text-orange-600"
                }`
              }
            >
              <span className="text-lg">{item.icon}</span>
              {isOpen && <span className="text-sm">{item.name}</span>}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Logout Button */}
      <div className="absolute bottom-6 left-0 w-full px-5">
        <button
          onClick={handleLogout}
          className="flex items-center gap-x-3 p-3 w-full text-gray-700 hover:text-red-600 hover:bg-red-100 rounded-md font-medium"
        >
          <FiLogOut className="text-lg" />
          {isOpen && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
