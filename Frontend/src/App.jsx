import React, { useContext } from "react";
import AppRoutes from "./routes.jsx";
import { AuthContext } from "./context/AuthContext.jsx";
import Sidebar from "./components/Sidebar.jsx";

const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* ✅ Sidebar only visible if user is logged in */}
      {user && <Sidebar userRole={user.role} />}

      <main className="flex-1 p-6">
        <AppRoutes />
      </main>
    </div>
  );
};

export default App;

