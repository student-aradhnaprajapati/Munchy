import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import RoleRoutes from "./routes/RoleRoutes.jsx";
import Sidebar from "./components/Sidebar.jsx";

function App() {
  const [userRole, setUserRole] = useState("student");

  return (
    <BrowserRouter>
      <div className="flex">
        <Sidebar userRole={userRole} />

        <div className="flex-1 p-4">
          <div className="mb-4">
            <label className="mr-2 font-bold">Select Role:</label>
            <select
              value={userRole}
              onChange={(e) => setUserRole(e.target.value)}
              className="border p-1 rounded"
            >
              <option value="student">Student</option>
              <option value="provider">Provider</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <RoleRoutes userRole={userRole} />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
