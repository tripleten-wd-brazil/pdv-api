const { model, Schema } = require("mongoose");

const productSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String },
});

module.exports = model("Product", productSchema);
