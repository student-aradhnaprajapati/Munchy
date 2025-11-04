import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    console.warn("🚫 Token missing from Authorization header");
    return res.status(401).json({ message: "Token missing" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log("✅ Token verified successfully for user:", decoded);
    next();
  } catch (err) {
    console.error("❌ Invalid or expired token:", err.message);
    res.status(403).json({ message: "Invalid token" });
  }
};

export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      console.log("🚫 Unauthorized role:", req.user?.role);
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};
