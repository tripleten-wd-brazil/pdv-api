const express = require('express');
const dotenv = require('dotenv');
const connectToMongo = require('./database');
const productRouter = require('./routes/products');
const errorMiddleware = require('./middlewares/error');

dotenv.config();
connectToMongo();
const app = express();

app.use(express.json());
app.use('/products', productRouter);
app.use(errorMiddleware);

const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
