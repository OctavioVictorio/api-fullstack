const express = require("express");
const router = express.Router();
const { login, register, forgotPassword, resetPassword } = require("../controllers/auth.controller");

router.post("/login", login);
router.post("/register", register);
router.post("/forgotPassword", forgotPassword);
router.post("/resetPassword", resetPassword);

module.exports = router;