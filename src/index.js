const express = require("express");
require("express-async-errors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const productRoutes = require("./routes/products");
const orderRoutes = require("./routes/orders");

dotenv.config();
const app = express();

const { PORT, DB_CONNECTION } = process.env;
mongoose.set("strictQuery", true);
mongoose.connect(DB_CONNECTION).then(() => console.log("Mongoose Connected!"));

app.use(express.json());
app.use(cors());

app.use("/products", productRoutes);
app.use("/order", orderRoutes);

app.use((err, req, res, next) => {
  console.error("Error: ", err);
  res.status(500).send(err);
});

app.listen(PORT, () => console.log(`Running on port ${PORT}`));
