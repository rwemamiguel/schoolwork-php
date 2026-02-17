const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middleware/authMiddleware");
const { getAllProducts, createProduct, deleteProduct } = require("../controllers/productController");

router.get("/", isAuthenticated, getAllProducts);
router.post("/", isAuthenticated, createProduct);
router.delete("/:id", isAuthenticated, deleteProduct);

module.exports = router;
