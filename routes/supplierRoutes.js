const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middleware/authMiddleware");
const { getAllSuppliers, createSupplier } = require("../controllers/supplierController");

router.get("/", isAuthenticated, getAllSuppliers);
router.post("/", isAuthenticated, createSupplier);

module.exports = router;
