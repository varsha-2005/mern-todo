require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const todoRoute = require("./routes/todoRoute.js");
const userRoute = require("./routes/userRoute.js");
const connectDB = require("./config/db.js");

const app = express();

// Allowed frontend origins
const allowedOrigins = [
  "http://localhost:5173", // Development
  "https://todo-client-gold-phi.vercel.app", // Deployed frontend on Vercel
];

// CORS middleware
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true, // Allow cookies and tokens to be sent
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Ensure preflight requests get a proper response
app.options("*", cors());

app.use(express.json());

app.use("/api/todos", todoRoute);
app.use("/api/auth", userRoute);

// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}`);
});
