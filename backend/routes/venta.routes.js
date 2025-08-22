const express = require("express");
const router = express.Router();
const { getAllSells, getSaleById, createSale,updateSale, deleteSale } = require("../controllers/venta.controller");

const verifyToken = require("../middlewares/verifyToken");
const isAdmin = require("../middlewares/isAdmin");

router.get("/", verifyToken, getAllSells);
router.get("/:id", verifyToken, getSaleById);
router.post("/", verifyToken, isAdmin, createSale);
router.put("/:id", verifyToken, isAdmin, updateSale);
router.delete("/:id", verifyToken, isAdmin, deleteSale);

module.exports = router;
