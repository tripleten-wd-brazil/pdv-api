// common JS
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const userRouter = require('./routes/users');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api', userRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

async function main() {
  await mongoose.connect(process.env.MONGO_URI);
}

main()
  .then(() => console.log('MongoDB running'))
  .catch((err) => console.log(err));
