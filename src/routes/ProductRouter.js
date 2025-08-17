const express = require("express");
const router = express.Router();
const {
  authMiddleware,
  authUserMiddleware,
} = require("../middleware/authMiddleware");
const productController = require("../controllers/ProductController");

router.post("/create", productController.createProduct);
router.post("/update/:id", authMiddleware, productController.updateProduct);
router.get("/get-detail/:id", authMiddleware, productController.getProductDetail);
router.delete("/delete/:id", authMiddleware, productController.deleteProduct);
router.get("/get-all", productController.getAllProducts);

module.exports = router;
