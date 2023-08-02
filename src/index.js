const express = require('express');
const dotenv = require('dotenv');
const connectToMongo = require('./database');
const productRouter = require('./routes/products');
const userRouter = require('./routes/users');
const errorMiddleware = require('./middlewares/error');
const authMiddleware = require('./middlewares/auth');

dotenv.config();
connectToMongo();
const app = express();

app.use(express.json());
app.use(userRouter);
app.use(authMiddleware);
app.use('/products', productRouter);
app.use(errorMiddleware);

const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
