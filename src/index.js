const dotenv = require("dotenv");
const express = require("express");
require("express-async-errors");
const productRoutes = require("./modules/products/route");
const userRoutes = require("./modules/user/route");
const dbConnection = require("./db");
const authenticationMiddleware = require("./middlewares/authentication");

dotenv.config();

const app = express();
const port = 3000;

async function main() {
  dbConnection();
  app.use(express.json());
  app.use(userRoutes);
  app.use(authenticationMiddleware);
  app.use("/products", productRoutes);

  app.use((err, req, res, next) => {
    if (err) {
      console.error(">>>> Error", err);
      res.status(500).send("Internal server error");
    }

    next();
  });

  app.listen(port, () => {
    console.log(`PDV api listening on port ${port}`);
  });
}

main();
