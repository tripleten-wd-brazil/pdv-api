const User = require("../models/users");

const getUsers = (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(500).json("Error: " + err));
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);

  // guard clause or early return;
  if (!user) {
    return res.status(404).json("Not found");
  }

  // Happy path
  res.json(user);
};

const createUser = (req, res) => {
  User.create(req.body)
    .then((createdUser) => res.json(createdUser))
    .catch((err) => res.status(500).json("Error: " + err));
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
};
