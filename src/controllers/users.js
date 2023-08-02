const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/users');

const createUser = async (req, res) => {
  const { email, password } = req.body;
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);

  await User.create({
    email,
    password: hashPassword,
  });

  res.send('Ok!');
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');

  const isValid = await bcrypt.compare(password, user?.password || '');
  if (!isValid) {
    return res.status(401).json({ message: 'Email or password invalid.' });
  }

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  return res.json({
    token,
  });
};

module.exports = {
  createUser,
  login,
};
