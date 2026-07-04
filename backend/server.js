// src/server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const compression = require("compression");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  }),
);
app.use(compression());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: true,
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

// Auth Routes (dummy for now)
app.post("/api/auth/login", (req, res) => {
  const { user_id, password } = req.body;

  // Dummy login - accept any credentials
  if (user_id && password) {
    res.json({
      status: true,
      code: 200,
      message: "Login successful",
      data: {
        token: "dummy-jwt-token-" + Date.now(),
        expireAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        user: {
          id: 1,
          user_id: user_id,
          full_name: user_id === "admin" ? "Admin User" : user_id,
          role: "ADMIN",
          email: "admin@crew.com",
          phone: "0912345678",
        },
      },
    });
  } else {
    res.status(401).json({
      status: false,
      code: 401,
      message: "Invalid credentials",
      error: "user_id and password are required",
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || "development"}`);
});
