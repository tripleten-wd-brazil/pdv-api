const { Router } = require("express");
const Joi = require("joi");
const Product = require("../models/Product");
const validate = require("../middleware/validate");

const router = new Router();

router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

const createProductSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  category: Joi.string().valid("Lanches", "Doces", "Bebidas"),
  imageUrl: Joi.string().uri().optional(),
});
router.post("/", validate(createProductSchema), async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
});

router.delete("/:id", async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    return res.status(404).send("Product not found");
  }
  return res.status(204).send();
});

router.put("/:id", async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    returnDocument: "after",
  });

  if (!product) {
    return res.status(404).send("No product found");
  }

  return res.json(product);
});

module.exports = router;
