// common JS
const express = require('express');
const userRouter = require('./routes/users');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(userRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
