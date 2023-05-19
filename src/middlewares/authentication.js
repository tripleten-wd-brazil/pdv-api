const jwt = require("jsonwebtoken");

const authenticationMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ message: "Token not found" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    return next();
  } catch (err) {
    return res.status(401).json({ message: "Token invalid" });
  }
};

module.exports = authenticationMiddleware;
