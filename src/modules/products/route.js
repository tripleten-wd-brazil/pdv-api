const { Router } = require("express");
const Product = require("./model");

const router = new Router();

router.get("/", async (req, res) => {
  const products = await Product.find({ ...req.query });
  res.json(products);
});

router.post("/", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.json(product);
  } catch (error) {
    console.error(">>>> Error creating product", error);
    res.send("Internal server error");
  }
});

module.exports = router;
