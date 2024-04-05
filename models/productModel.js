const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  image: String,
});

const productModel = mongoose.model("products", productSchema);

module.exports = productModel;
