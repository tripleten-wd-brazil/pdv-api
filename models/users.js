const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String },
  about: { type: String },
  avatar: { type: String },
  email: { type: String, required: true },
  password: { type: String, required: true, select: false },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
