import React from "react";

function Users() {
  const users = ["Rahul", "Sneha", "Aman"];
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-red-600 mb-6">All Students</h1>
      <ul className="space-y-2">
        {users.map((user, idx) => (
          <li key={idx} className="p-3 bg-white shadow rounded">{user}</li>
        ))}
      </ul>
    </div>
  );
}

export default Users;
