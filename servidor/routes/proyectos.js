const express = require("express");
const router = express.Router();
const proyectoController = require("../controllers/proyectoController");
const auth = require("../middleware/auth");
const { check } = require("express-validator");

//metodo POST de la ruta de usuarios
router.post(
  "/",
  auth,
  [
    check("nombre", "El nombre del proyecto es obligatorio")
      .not()
      .isEmpty()
  ],
  proyectoController.crearProyecto
);

//metodo GET de la ruta de usuarios
router.get("/", auth, proyectoController.obtenerProyectos);

//metodo PUT de la ruta de usuarios
router.put(
  "/:id",
  auth,
  [
    check("nombre", "El nombre del proyecto es obligatorio")
      .not()
      .isEmpty()
  ],
  proyectoController.actualizarProyecto
);

//metodo DELETE de la ruta de usuarios
router.delete("/:id", auth, proyectoController.eliminarProyecto);

module.exports = router;
