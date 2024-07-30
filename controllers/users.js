const User = require("../models/users");
const NotFoundError = require("../errors/NotFoundError");

const getUsers = (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(500).json("Error: " + err));
};

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    // guard clause or early return;
    if (!user) {
      return res.status(404).json("Not found");
    }

    // Happy path
    res.json(user);
  } catch (error) {
    throw new NotFoundError(error.message); 
  }
};

const createUser = (req, res) => {
  return User.create(req.body)
    .then((createdUser) => res.json(createdUser))
    .catch((err) => res.status(500).json("Error: " + err));
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
};
