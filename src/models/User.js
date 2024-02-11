const { model, Schema } = require("mongoose");
const crypto = require("crypto");

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, select: false },
  job: { type: String, required: true },
  avatar: { type: String },
  cohort: { type: String },
  token: { type: String, default: crypto.randomUUID(), select: false },
});

module.exports = model("User", userSchema);
