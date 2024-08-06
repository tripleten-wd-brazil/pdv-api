const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    console.log(req.headers);
    const { authorization } = req.headers; // Bearer adfadfaf1adfadf1
    const [, token] = authorization?.split(" "); // [Bearer, "token"]

    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log(verifiedToken);
    req.user = {
      _id: verifiedToken.id,
    };
    next();
  } catch (err) {
    console.error(err);
    res.status(401).send("Unauthorized");
  }
};

module.exports = authMiddleware;
