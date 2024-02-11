const User = require("../models/User");

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send("Unauthorized");
  }

  const user = await User.findOne({ token });
  if (!user) {
    return res.status(401).send("Unauthorized");
  }

  req.user = user;
  return next();
};
