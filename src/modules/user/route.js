const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./model");

const router = new Router();
router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  await User.create({ email, password: hashedPassword });
  res.json("");
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  const isPasswordValid = await bcrypt.compare(password, user?.password || "");
  if (!isPasswordValid) {
    return res.status(400).json({ message: "Password or email invalid" });
  }

  const token = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return res.json({ token, email });
});

module.exports = router;
