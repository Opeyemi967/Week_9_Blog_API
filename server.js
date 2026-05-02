// ========================================
// IMPORT REQUIRED PACKAGES
// ========================================

// Express framework
const express = require("express");

// dotenv helps load .env variables
const dotenv = require("dotenv");

// ========================================
// IMPORT CUSTOM FILES
// ========================================

// MongoDB connection function
const connectDB = require("./config/db");

// Article routes
const articleRoutes = require("./routes/articleRoutes");

// ========================================
// LOAD .ENV VARIABLES
// ========================================

// Load variables from .env file
dotenv.config();

// ========================================
// CONNECT DATABASE
// ========================================

// Connect MongoDB Atlas
connectDB();

// ========================================
// CREATE EXPRESS APP
// ========================================

const app = express();

// ========================================
// PORT SETUP
// ========================================

// Use .env PORT or fallback to 5000
const PORT = process.env.PORT || 5000;

// ========================================
// MIDDLEWARE
// ========================================

// Parse JSON request body
app.use(express.json());

// Custom request logger
// Shows every request in terminal
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// ========================================
// ROOT ROUTE (Professional Welcome Route)
// ========================================

// Instead of showing Route not found on "/"
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Blog API is running successfully",
  });
});

// ========================================
// ROUTES
// ========================================

// All article routes start with /articles
app.use("/articles", articleRoutes);

// ========================================
// 404 HANDLER
// ========================================

// Handles routes that do not exist
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
  });
});

// ========================================
// START SERVER
// ========================================

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
