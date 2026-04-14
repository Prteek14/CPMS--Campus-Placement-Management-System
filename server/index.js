const express = require("express");
const cors = require("cors");
const dbConnect = require("./src/config/db");
require("dotenv").config();

// routes import
const authRoutes = require("./src/routes/authStudentRoutes");
const adminRoutes = require("./src/routes/authAdminRoutes");

const PORT = process.env.PORT || 5000;
const app = express();

dbConnect();

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use(express.json());

// routes

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

app.listen(PORT, () => {
  console.log(`your server is running on http://localhost:${PORT}`);
});
