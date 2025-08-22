const express = require("express");
const router = express.Router();
const {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} = require("../controllers/products.controller");

const verifyToken = require("../middlewares/verifyToken");
const isAdmin = require("../middlewares/isAdmin");

// Los endpoints de "get" solo requieren un token
router.get("/", verifyToken, getProducts);
router.get("/:id", verifyToken, getProductById); // APLICO verifyToken

// Los endpoints de "post", "put" y "delete" requieren ser admin
router.post("/", verifyToken, isAdmin, createProduct); // Ok
router.put("/:id", verifyToken, isAdmin, updateProduct); // APLICO verifyToken e isAdmin
router.delete("/:id", verifyToken, isAdmin, deleteProduct); // APLICO verifyToken e isAdmin

module.exports = router;