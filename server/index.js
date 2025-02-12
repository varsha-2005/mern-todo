require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const todoRoute = require("./routes/todoRoute.js");
const userRoute = require("./routes/userRoute.js");
const connectDB = require("./config/db.js");
const allowedOrigins = [process.env.APPLICATION_URL];

console.log("MONGO_URI from .env:", process.env.MONGO_URI);
const app = express();
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json());

app.use("/api/todos", todoRoute);
app.use("/api/auth", userRoute);


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  connectDB()
  console.log(`Server running on port ${PORT}`)
});
