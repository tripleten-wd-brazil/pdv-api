const { Router } = require("express");
const router = new Router();
const { login, createUser } = require("../controllers/auth");

router.post("/signin", login);
router.post("/signup", createUser);

module.exports = router;
