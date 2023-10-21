const express = require("express");
const router = express.Router();
const { getAllProducts, getSingleProduct } = require("../controllers/products");

router.get("/", getAllProducts);
router.get("/:productID", getSingleProduct);

module.exports = router;
