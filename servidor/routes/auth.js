const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const auth = require("../middleware/auth");
const authController = require("../controllers/authController");

//metodo POST de la ruta de autenticacion
router.post("/", authController.autenticarUsuario);

//metodo GET de la ruta de autenticacion
router.get("/", auth, authController.usuarioAutenticado);

module.exports = router;
