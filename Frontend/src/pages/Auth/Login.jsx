// src/pages/Auth/Login.jsx
import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { postData } from "../../api.js";
import { AuthContext } from "../../context/AuthContext.jsx";

// Import Google Font
const poppinsFont = document.createElement("link");
poppinsFont.href =
  "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap";
poppinsFont.rel = "stylesheet";
document.head.appendChild(poppinsFont);

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user, login } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      if (user.role === "admin") navigate("/dashboard/admin");
      else if (user.role === "mess") navigate("/dashboard/mess");
      else navigate("/dashboard/user");
    }
  }, [user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await postData("/auth/login", form);
      console.log("Login API Response:", res);

      if (res.user && res.token) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));
        login(res.user, res.token);

        if (res.user.role === "admin") navigate("/admin");
        else if (res.user.role === "provider") navigate("/provider");
        else navigate("/user");
      } else {
        setError(res.message || "Invalid credentials.");
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError("Invalid email or password.");
    }
  };


  return (
    <div
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1920&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(135deg, rgba(255,107,53,0.85), rgba(255,193,7,0.5))",
          zIndex: 1,
        }}
      />

      {/* Main Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            width: "400px",
            padding: "50px 35px",
            borderRadius: "25px",
            background: "rgba(255, 255, 255, 0.95)",
            boxShadow: "0 15px 40px rgba(0,0,0,0.25)",
            backdropFilter: "blur(10px)",
          }}
        >
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              textAlign: "center",
              color: "#ff6b35",
              fontSize: "2rem",
              fontWeight: "700",
              marginBottom: "10px",
            }}
          >
            Welcome back to <br /> Munchy
          </motion.h2>

          <form
            onSubmit={handleLogin}
            style={{ display: "flex", flexDirection: "column", gap: "22px" }}
          >
            {/* Email Input */}
            <div>
              <label
                style={{
                  display: "block",
                  color: "#333",
                  fontWeight: "600",
                  marginBottom: "6px",
                }}
              >
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email address"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                style={{
                  width: "90%",
                  padding: "12px 15px",
                  borderRadius: "12px",
                  border: "1.5px solid #ffc89f",
                  backgroundColor: "#fff8f3",
                  fontSize: "1rem",
                  color: "#333",
                  transition: "0.3s",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#ff6b35")}
                onBlur={(e) => (e.target.style.borderColor = "#ffc89f")}
              />
            </div>

            {/* Password Input */}
            <div style={{ position: "relative" }}>
              <label
                style={{
                  display: "block",
                  color: "#333",
                  fontWeight: "600",
                  marginBottom: "6px",
                }}
              >
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
                style={{
                  width: "82%",
                  padding: "12px 45px 12px 15px",
                  borderRadius: "12px",
                  border: "1.5px solid #ffc89f",
                  backgroundColor: "#fff8f3",
                  fontSize: "1rem",
                  color: "#333",
                  transition: "0.3s",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#ff6b35")}
                onBlur={(e) => (e.target.style.borderColor = "#ffc89f")}
              />
              <i
                className={`bx ${showPassword ? "bx-show" : "bx-hide"}`}
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "15px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: "1.4rem",
                  color: "#ff6b35",
                  cursor: "pointer",
                }}
              ></i>
            </div>

            {/* Error */}
            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ color: "red", textAlign: "center", fontSize: "0.9rem" }}
              >
                {error}
              </motion.p>
            )}

            {/* Login Button */}
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "#e85d2a" }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              style={{
                backgroundColor: "#ff6b35",
                color: "white",
                border: "none",
                padding: "13px 0",
                borderRadius: "50px",
                fontSize: "1.05rem",
                fontWeight: "bold",
                boxShadow: "0 6px 15px rgba(255,107,53,0.4)",
                transition: "0.3s",
              }}
            >
              Login
            </motion.button>
          </form>

          {/* Register Link */}
          <p
            style={{
              textAlign: "center",
              color: "#333",
              marginTop: "25px",
              fontSize: "0.95rem",
            }}
          >
            Don’t have an account?{" "}
            <Link
              to="/register"
              style={{
                color: "#ff6b35",
                fontWeight: "600",
                textDecoration: "none",
              }}
            >
              Register here
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
