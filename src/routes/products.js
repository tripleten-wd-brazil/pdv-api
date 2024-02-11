const { Router } = require("express");
const Joi = require("joi");
const Product = require("../models/Product");
const validate = require("../middleware/validate");

const router = new Router();

router.get("/", async (req, res) => {
  const products = await Product.find({
    cohort: req.user.cohort,
  }).populate("owner");
  return res.json(products);
});

const createProductSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  category: Joi.string().valid("Lanches", "Doces", "Bebidas"),
  image: Joi.string().uri().optional(),
});
router.post("/", validate(createProductSchema), async (req, res) => {
  const { _id, cohort } = req.user;
  const product = await Product.create({ ...req.body, owner: _id, cohort });
  res.status(201).json(product);
});

router.delete("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).send("Product not found");
  }
  const { _id } = req.user;
  if (product.owner.toString() !== _id.toString()) {
    return res.status(403).send("Unauthorized");
  }

  return res.status(204).send();
});

const updateProductSchema = Joi.object({
  name: Joi.string().optional(),
  price: Joi.number().optional(),
  category: Joi.string().optional().valid("Lanches", "Doces", "Bebidas"),
  image: Joi.string().uri().optional(),
});
router.put("/:id", validate(updateProductSchema), async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).send("Product not found");
  }

  const { _id } = req.user;
  if (product.owner.toString() !== _id.toString()) {
    return res.status(403).send("Unauthorized");
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  return res.json(updatedProduct);
});

module.exports = router;
