const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const sequelize = require("./config/db");

// Import routes
const authRoutes = require("./routes/authRoutes");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Use routes
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => res.send("Munchy Backend Running ✅"));

// Sync DB & start server
sequelize.sync({ alter: true }).then(() => {
  app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
});
