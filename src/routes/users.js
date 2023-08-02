const { Router } = require('express');
const { createUser, login } = require('../controllers/users');

const router = new Router();

router.post('/signup', createUser);
router.post('/login', login);

module.exports = router;
