const { validationResult } = require("express-validator");
const Tarea = require("../models/Tarea");
const Proyecto = require("../models/Proyecto");

//funcion del controlador que crea una tarea
exports.crearTarea = async (req, res) => {
  //asigna la los posibles errores en la funcion de express-validator
  const errores = validationResult(req);

  //si existen errores, los muestra por pantalla con su codigo de estado
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  try {
    //desestructura desde el body
    const { proyecto } = req.body;
    //asigna a la constante los proyectos por Id
    const existeProyecto = await Proyecto.findById(proyecto);

    //de no existir un proyecto repsonde con un error y su codigo
    if (!existeProyecto) {
      return res.status(404).json({ msg: "Proyecto no encontrado" });
    }

    //si el creador del proyecto es distinto al del id del usuario responde con un error y su codigo
    if (existeProyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }

    //asigna una nueva tarea a la constante
    const tarea = new Tarea(req.body);
    //guarda la tarea en la DB
    await tarea.save();
    //lo devuelve como respuesta en formato JSON
    res.json({ tarea });
  } catch (error) {
    console.error(error);
    res.status(500).send("Hubo un error");
  }
};

//funcion del controlador que obtiene las tareas
exports.obtenerTareas = async (req, res) => {
  try {
    //desestructura desde el body
    const { proyecto } = req.query;
    //asigna a la constante los proyectos por Id
    const existeProyecto = await Proyecto.findById(proyecto);

    //de no existir un proyecto repsonde con un error y su codigo
    if (!existeProyecto) {
      return res.status(404).json({ msg: "Proyecto no encontrado" });
    }

    //si el creador del proyecto es distinto al del id del usuario responde con un error y su codigo
    if (existeProyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }

    //asigna todas las tareas segun el proyecto a la constante
    const tareas = await Tarea.find({ proyecto }).sort({ creado: -1 });
    //lo devuelve como respuesta en formato JSON
    res.json({ tareas });
  } catch (error) {
    console.error(error);
    res.status(500).send("Hubo un error");
  }
};

//funcion del controlador que actualiza una tarea
exports.actualizarTarea = async (req, res) => {
  try {
    //desestructura desde el body
    const { proyecto, nombre, estado } = req.body;
    //asigna a la constante los proyeto por Id
    const existeProyecto = await Proyecto.findById(proyecto);

    //asigna a la variable las tareas segun su id
    let tarea = await Tarea.findById(req.params.id);

    //de no existir la tarea muestra el error con su codigo
    if (!tarea) {
      return res.status(404).json({ msg: "La tarea no existe" });
    }

    //si el creador del proyecto es distinto al del id del usuario responde con un error y su codigo
    if (existeProyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }

    //crea un objeto vacio
    const nuevaTarea = {};

    //si existe un nombre se lo asigna a una nueva instancia del objeto
    nuevaTarea.nombre = nombre;
    //si existe un estado se lo asigna a una nueva instancia del objeto
    nuevaTarea.estado = estado;

    //asigna a la variable la tarea actualizada
    tarea = await Tarea.findOneAndUpdate({ _id: req.params.id }, nuevaTarea, {
      new: true
    });
    //lo devuelve como respuesta en formato JSON
    res.json({ tarea });
  } catch (error) {
    console.error(error);
    res.status(500).send("Hubo un error");
  }
};

//funcion del controlador que elimina una tarea
exports.eliminarTarea = async (req, res) => {
  try {
    //desestructura desde el query
    const { proyecto } = req.query;
    //asigna a la constante todos los proyecto por su Id
    const existeProyecto = await Proyecto.findById(proyecto);

    //asigna a la variable las tareas segun si Id
    let tarea = await Tarea.findById(req.params.id);

    //de no existir la tarea muestra el error con su codigo
    if (!tarea) {
      return res.status(404).json({ msg: "La tarea no existe" });
    }

    //si el creador del proyecto es distinto al del id del usuario responde con un error y su codigo
    if (existeProyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }

    //elimina la tarea segun el Id
    await Tarea.findByIdAndRemove({ _id: req.params.id });
    //responde con un mensaje
    res.json({ msg: "Tarea eliminada." });
  } catch (error) {
    console.error(error);
    res.status(500).send("Hubo un error");
  }
};
