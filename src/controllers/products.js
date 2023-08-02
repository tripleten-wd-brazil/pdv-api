const Product = require('../models/products');

const listProducts = (req, res) => {
  Product.find().then((products) => {
    res.json(products);
  });
};

const createProduct = (req, res, next) => {
  Product.create(req.body)
    .then((createdProduct) => {
      res.status(201).json(createdProduct);
    })
    .catch(next);
};

const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product.user !== req.user._id) {
    return res.status(403).json('Invalid user');
  }
  return Product.findByIdAndDelete(req.params.id).then(() =>
    res.status(204).send()
  );
};

module.exports = {
  listProducts,
  createProduct,
  deleteProduct,
};
