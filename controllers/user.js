const User = require('../models/user');

module.exports.getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};
