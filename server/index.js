require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const todoRoute = require("./routes/todoRoute.js");
const userRoute = require("./routes/userRoute.js");
const connectDB = require("./config/db.js");

const app = express();

// Define allowed origins (development + production frontend)
const allowedOrigins = [
  "http://localhost:5173", // Development Frontend
  "https://todo-client-gold-phi.vercel.app", // Deployed Frontend on Vercel
];

// CORS Middleware
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true, // Allow cookies & auth headers
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// Define routes
app.use("/api/todos", todoRoute);
app.use("/api/auth", userRoute);

// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}`);
});
