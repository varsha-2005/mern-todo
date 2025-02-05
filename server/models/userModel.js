const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { String, required: true },
  email: { type: String, unique: true },
  password: { String, required: true },
});

module.exports = mongoose.model("User", UserSchema);
