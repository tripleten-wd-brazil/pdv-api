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

const deleteProduct = (req, res) => {
  Product.findByIdAndDelete(req.params.id).then(() => res.status(204).send());
};

module.exports = {
  listProducts,
  createProduct,
  deleteProduct,
};
