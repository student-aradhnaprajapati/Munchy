import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME || "munchy_db",
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10
});

pool.getConnection()
  .then(() => console.log("Connected to MySQL Database"))
  .catch((err) => console.error("Database connection failed:", err));

export default pool;