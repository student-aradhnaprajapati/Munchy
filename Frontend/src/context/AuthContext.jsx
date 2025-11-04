import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);

  // 🧩 Sync user & token with localStorage on every change
  useEffect(() => {
    try {
      if (user) localStorage.setItem("user", JSON.stringify(user));
      else localStorage.removeItem("user");

      if (token) localStorage.setItem("token", token);
      else localStorage.removeItem("token");
    } catch (error) {
      console.error("Error syncing auth data:", error);
    }
  }, [user, token]);

  // 🕒 Simulate initial loading state (e.g., verifying user)
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300); // small delay for UX
    return () => clearTimeout(timer);
  }, []);

  // ✅ Login handler
  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);

    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", authToken);
  };

  // 🚪 Logout handler
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    sessionStorage.clear();
    window.location.replace("/"); // redirect to landing
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
        setUser,
        setToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
