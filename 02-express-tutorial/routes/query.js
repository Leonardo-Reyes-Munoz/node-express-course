const express = require("express");
const router = express.Router();
const { searchProducts } = require("../controllers/query");

router.get("/", searchProducts);

module.exports = router;
