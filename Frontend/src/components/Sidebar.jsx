import React from "react";
import { Link } from "react-router-dom";

function Sidebar({ userRole }) {
  let links = [];

  if (userRole === "student") {
    links = [
      { name: "Home", path: "/" },
      { name: "Menu", path: "/menu" },
      { name: "Orders", path: "/orders" },
    ];
  } else if (userRole === "provider") {
    links = [
      { name: "Dashboard", path: "/" },
      { name: "Menu Management", path: "/menu" },
      { name: "Orders", path: "/orders" },
    ];
  } else if (userRole === "admin") {
    links = [
      { name: "Dashboard", path: "/" },
      { name: "Users", path: "/users" },
      { name: "Providers", path: "/providers" },
    ];
  }

  return (
    <div className="w-48 bg-gray-200 min-h-screen p-4">
      <h2 className="text-xl font-bold mb-4">Munchy</h2>
      <ul>
        {links.map((link) => (
          <li key={link.path} className="mb-2">
            <Link
              to={link.path}
              className="block p-2 rounded hover:bg-gray-300"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
