const express = require("express");
const router = express.Router();
const {
    getUsuarios,
    getUsuariosById,
    createUsuario,
    updateUsuario,
    deleteUsuario,
} = require("../controllers/usuarios.controller");

const verifyToken = require("../middlewares/verifyToken");
const isAdmin = require("../middlewares/isAdmin");

router.get("/", verifyToken, getUsuarios);
router.get("/:id", verifyToken, getUsuariosById);

router.post("/", verifyToken, isAdmin, createUsuario);
router.put("/:id", verifyToken, isAdmin, updateUsuario);
router.delete("/:id", verifyToken, isAdmin, deleteUsuario);

module.exports = router;
