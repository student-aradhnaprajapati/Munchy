import React, { useEffect, useState } from "react";
import { getAllUsers } from "../../services/userService.js";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("❌ Error fetching users:", error);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Filter users by name or email
  const filteredUsers = users.filter((u) => {
    const name = u.name?.toLowerCase() || "";
    const email = u.email?.toLowerCase() || "";
    return name.includes(search.toLowerCase()) || email.includes(search.toLowerCase());
  });

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-700">
        👥 User Management
      </h1>

      {/* Search Input */}
      <div className="flex justify-end mb-4">
        <input
          type="text"
          placeholder="Search by name or email..."
          className="border border-gray-300 rounded-xl px-4 py-2 w-full sm:w-1/3 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="bg-white p-6 rounded-2xl shadow-md overflow-x-auto">
        {loading ? (
          <p className="text-center text-gray-500 italic py-6">Loading users...</p>
        ) : (
          <table className="min-w-full text-sm border-collapse">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="py-3 px-4 text-left rounded-tl-xl">#</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Role</th>
                <th className="py-3 px-4 text-left">Created At</th>
                <th className="py-3 px-4 text-center rounded-tr-xl">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user, index) => (
                  <tr
                    key={user.id || user._id || index}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="py-3 px-4">{index + 1}</td>
                    <td className="py-3 px-4 font-medium text-gray-800">
                      {user.name || "N/A"}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {user.email || "N/A"}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          user.role === "admin"
                            ? "bg-indigo-100 text-indigo-700"
                            : user.role === "mess"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {user.role || "user"}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-500">
                      {user.created_at
                        ? new Date(user.created_at).toLocaleDateString("en-IN")
                        : "—"}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          user.active
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {user.active ? "Active" : "Inactive"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="py-6 text-center text-gray-500 italic"
                  >
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Users;
