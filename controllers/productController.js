const productModel = require("../models/productModel");

const productController = {
  async renderProduct(req, res) {
    const products = await productModel.find();

    res.render("pages/products/products", { products });
  },
  renderAddProduct(req, res) {
    res.render("pages/products/addProduct");
  },
  async add(req, res) {
    let data = req.body;
    if (req.file) {
      data = { ...data, image: req.file.filename };
    }
    const product = await productModel(data);
    await product.save();
    res.redirect("/product");
  },
};

module.exports = { productController };
