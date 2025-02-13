const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const todoRoute = require("./routes/todoRoute.js");
const userRoute = require("./routes/userRoute.js");
const connectDB = require("./config/db.js");

const app = express();

const allowedOrigins = [
  "http://localhost:5173", // Development Frontend
  "https://todo-client-gold-phi.vercel.app", // Production Frontend on Vercel
];

// Properly configure CORS
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true, // Allows cookies and authentication headers
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// Define Routes
app.use("/api/todos", todoRoute);
app.use("/api/auth", userRoute);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res
    .status(500)
    .json({ message: "Internal Server Error", error: err.message });
});

// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}`);
});
