const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, require: true },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
