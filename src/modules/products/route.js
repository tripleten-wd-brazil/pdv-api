const { Router } = require("express");
const Product = require("./model");
const { createProduct } = require("./controller");

const router = new Router();

router.get("/", async (req, res) => {
  const products = await Product.find({ ...req.query });
  res.json(products);
});

router.post("/", createProduct);

module.exports = router;
