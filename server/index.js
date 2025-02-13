require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const todoRoute = require("./routes/todoRoute.js");
const userRoute = require("./routes/userRoute.js");
const connectDB = require("./config/db.js");

const app = express();

// Allowed frontend origins

app.use(express.json());

app.use("/api/todos", todoRoute);
app.use("/api/auth", userRoute);

// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}`);
});
