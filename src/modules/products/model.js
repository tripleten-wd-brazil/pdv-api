const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  imageUrl: { type: String },
});

module.exports = mongoose.model("Product", productSchema);
