const express = require("express");
const { productController } = require("../controllers/productController");
const upload = require("../middlewares/multer");
const router = express.Router();

router.get("/", productController.renderProduct);
router.get("/add", productController.renderAddProduct);
router.post("/add", upload, productController.add);

const productRouter = router;

module.exports = { productRouter };
