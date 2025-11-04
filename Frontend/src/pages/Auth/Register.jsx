import React, { useState } from "react";
import { postData } from "../../api.js";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // ✅ Handle Registration
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await postData("/auth/register", form);

      if (res.status === 200 || res?.message) {
        setSuccess(res.message || "Registration successful!");
        setForm({ name: "", email: "", password: "", role: "user" });
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setError(res?.error || "Registration failed. Please try again.");
      }
    } catch (err) {
      console.error("Registration Error:", err);
      setError("Something went wrong. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1528715471579-d1bcf0ba5e83?auto=format&fit=crop&w=1920&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        position: "relative",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(135deg, rgba(255,107,53,0.8), rgba(255,193,7,0.5))",
          zIndex: 1,
        }}
      />

      {/* Form Container */}
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
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            width: "340px",
            padding: "35px 28px",
            borderRadius: "22px",
            background: "rgba(255, 255, 255, 0.95)",
            boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
            backdropFilter: "blur(8px)",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              color: "#ff6b35",
              fontSize: "1.7rem",
              fontWeight: "700",
            }}
          >
            Create Your Account 
          </h2>
          {/* Form */}
          <form
            onSubmit={handleRegister}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "18px",
            }}
          >
            {/* Name */}
            <input
              type="text"
              placeholder="Full Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              style={{
                width: "90%",
                padding: "10px 14px",
                borderRadius: "10px",
                border: "1.5px solid #ffc89f",
                backgroundColor: "#fff8f3",
                fontSize: "0.95rem",
                transition: "0.3s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#ff6b35")}
              onBlur={(e) => (e.target.style.borderColor = "#ffc89f")}
            />

            {/* Email */}
            <input
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              style={{
                width: "90%",
                padding: "10px 14px",
                borderRadius: "10px",
                border: "1.5px solid #ffc89f",
                backgroundColor: "#fff8f3",
                fontSize: "0.95rem",
                transition: "0.3s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#ff6b35")}
              onBlur={(e) => (e.target.style.borderColor = "#ffc89f")}
            />

            {/* Password */}
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
                style={{
                  width: "82%",
                  padding: "10px 40px 10px 14px",
                  borderRadius: "10px",
                  border: "1.5px solid #ffc89f",
                  backgroundColor: "#fff8f3",
                  fontSize: "0.95rem",
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
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: "1.3rem",
                  color: "#ff6b35",
                  cursor: "pointer",
                }}
              ></i>
            </div>

            {/* Role */}
            <select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              style={{
                width: "100%",
                padding: "10px 14px",
                borderRadius: "10px",
                border: "1.5px solid #ffc89f",
                backgroundColor: "#fff8f3",
                fontSize: "0.95rem",
              }}
            >
              <option value="user">User</option>
              <option value="mess">Mess Provider</option>
              <option value="admin">Admin</option>
            </select>

            {/* Alerts */}
            {error && (
              <p style={{ color: "red", textAlign: "center", fontSize: "0.85rem" }}>
                {error}
              </p>
            )}
            {success && (
              <p style={{ color: "green", textAlign: "center", fontSize: "0.85rem" }}>
                {success}
              </p>
            )}

            {/* Register Button */}
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "#e85d2a" }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={loading}
              style={{
                backgroundColor: "#ff6b35",
                color: "white",
                border: "none",
                padding: "11px 0",
                borderRadius: "25px",
                fontSize: "1rem",
                fontWeight: "600",
                boxShadow: "0 6px 15px rgba(255,107,53,0.4)",
                cursor: "pointer",
              }}
            >
              {loading ? "Registering..." : "Register"}
            </motion.button>
          </form>

          {/* Login Link */}
          <p
            style={{
              textAlign: "center",
              color: "#333",
              marginTop: "18px",
              fontSize: "0.9rem",
            }}
          >
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              style={{
                color: "#ff6b35",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Login here
            </span>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
