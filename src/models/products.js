const { Schema, model } = require('mongoose');

const ProductSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, enum: ['Lanches', 'Bebidas', 'Doces'] },
});

const Product = model('Product', ProductSchema);
module.exports = Product;
