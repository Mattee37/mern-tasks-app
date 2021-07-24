const express = require("express");
const router = express.Router();
const tareaController = require("../controllers/tareaController");
const auth = require("../middleware/auth");
const { check } = require("express-validator");

//metodo POST de la ruta de usuarios
router.post(
  "/",
  auth,
  [
    check("nombre", "El nombre es obligatorio")
      .not()
      .isEmpty()
  ],
  tareaController.crearTarea
);

//metodo GET de la ruta de usuarios
router.get("/", auth, tareaController.obtenerTareas);

//metodo PUT de la ruta de usuarios
router.put("/:id", auth, tareaController.actualizarTarea);

//metodo DELETE de la ruta de usuarios
router.delete("/:id", auth, tareaController.eliminarTarea);

module.exports = router;
