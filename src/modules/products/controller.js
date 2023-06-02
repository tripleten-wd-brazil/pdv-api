const Product = require("./model");

const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.json(product);
  } catch (error) {
    console.error(">>>> Error creating product", error);
    res.send("Internal server error");
  }
};

module.exports = { createProduct };
