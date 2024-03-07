const fs = require('fs');
const path = require('path');
const express = require('express');

const router = express.Router();

router.get('/users', (req, res) => {
  const usersPath = path.join(__dirname, '../data/users.json');
  fs.readFile(usersPath, { encoding: 'utf8' }, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error fetching file');
    }
    const users = JSON.parse(data);
    res.json(users);
  });
});

router.get('/users/:id', (req, res) => {
  const usersPath = path.join(__dirname, '../data/users.json');
  fs.readFile(usersPath, { encoding: 'utf8' }, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error fetching file');
    }
    const users = JSON.parse(data);
    const selectedUser = users.find((user) => user._id === req.params.id);
    if (!selectedUser) {
      res.status(404).json({ message: 'ID do usuário não encontrado' });
    } else {
      res.json(selectedUser);
    }
  });
});

module.exports = router;
