const fs = require('fs');
const path = require('path');
const express = require('express');
const { getUsers } = require('../controllers/user');

const router = express.Router();

router.get('/users', getUsers);

// router.get('/users/:id'  );

module.exports = router;
