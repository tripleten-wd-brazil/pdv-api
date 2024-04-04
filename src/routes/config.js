const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = new Router();

router.post("/signup", async (req, res) => {
  const { password, ...userData } = req.body;
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);

  const createdUser = await User.create({
    ...userData,
    password: hashPassword,
  });

  res.status(201).json(createdUser);
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");

  const isValid = await bcrypt.compare(password, user?.password || "");
  if (!isValid) {
    return res.status(401).json({ message: "Email or password invalid." });
  }

  // eslint-disable-next-line no-underscore-dangle
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  return res.json({
    token,
  });
});

module.exports = router;
