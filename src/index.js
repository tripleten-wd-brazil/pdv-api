const express = require("express");
require("express-async-errors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const { default: helmet } = require("helmet");
const productRoutes = require("./routes/products");
const orderRoutes = require("./routes/orders");

dotenv.config();
const app = express();

const { PORT, DB_CONNECTION } = process.env;
mongoose.set("strictQuery", true);
mongoose.connect(DB_CONNECTION).then(() => console.log("Mongoose Connected!"));

app.use(express.json());
app.use(cors());

app.use(
  rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 100, // limit each IP to 100 requests per windowMs
  })
);

// app.use(
//   helmet({
//     crossOriginResourcePolicy: false,
//   })
// );

app.get("/health", (req, res) => res.send("Ok"));

app.use("/api/:key", (req, res, next) => {
  const { key } = req.params;
  if (key === process.env.API_KEY) {
    next();
  } else {
    res.status(401).send("Invalid API Key");
  }
});

app.use("/api/:key/products", productRoutes);
app.use("/api/:key/order", orderRoutes);

app.use((err, req, res, next) => {
  console.error("Error: ", err);
  res.status(500).send(err);
});

app.listen(PORT, () => console.log(`Running on port ${PORT}`));
