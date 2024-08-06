const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  const { password: rawPassword, ...user } = req.body;
  const password = await bcrypt.hash(rawPassword, 10);
  const createdUser = await User.create({
    ...user,
    password,
  });
  res.status(201).json(createdUser);
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return res.status(400).send("Usuário ou senha inválidos");
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return res.status(400).send("Usuário ou senha inválidos");
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token });
};

module.exports = {
  createUser,
  login,
};
