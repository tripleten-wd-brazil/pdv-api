const { model, Schema } = require("mongoose");

const productSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: {
    type: String,
    required: true,
    enum: ["Bebidas", "Lanches", "Doces"],
  },
  image: { type: String },
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  cohort: { type: String },
});

module.exports = model("Product", productSchema);
