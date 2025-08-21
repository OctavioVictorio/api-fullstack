const express = require("express");
const router = express.Router();
const { getAllSells, getSaleById, createSale,updateSale, deleteSale } = require("../controllers/venta.controller");

router.get("/", getAllSells);
router.get("/:id", getSaleById);
router.post("/", createSale);
router.put("/:id", updateSale);
router.delete("/:id", deleteSale);

module.exports = router;
