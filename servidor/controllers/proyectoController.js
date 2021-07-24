const Proyecto = require("../models/Proyecto");
const { validationResult } = require("express-validator");

//funcion del controlador que crea un proyecto
exports.crearProyecto = async (req, res) => {
  //asigna la los posibles errores en la funcion de express-validator
  const errores = validationResult(req);

  //si existen errores, los muestra por pantalla con su codigo de estado
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }
  try {
    //asigna a una constante un nuevo Schema con el body como parametro
    const proyecto = new Proyecto(req.body);
    //le asigna a una nueva instancia del objeto proyecto el id
    proyecto.creador = req.usuario.id;
    //guarda el objeto en la DB
    proyecto.save();
    //lo devuelve como respuesta en formato JSON
    res.json(proyecto);
  } catch (error) {
    console.error(error);
    res.status(500).send("Hubo un error");
  }
};

//funcion del controlador que obtiene una lista de proyectos
exports.obtenerProyectos = async (req, res) => {
  try {
    //asigna a la constante todos los proyectos segun sun creador
    const proyectos = await Proyecto.find({ creador: req.usuario.id }).sort({
      creado: -1
    });
    //lo devuelve como respuesta en formato JSON
    res.json({ proyectos });
  } catch (error) {
    console.error(error);
    res.status(500).send("Hubo un error");
  }
};

//funcion del controlador que actualiza el proyecto
exports.actualizarProyecto = async (req, res) => {
  //asigna la los posibles errores en la funcion de express-validator
  const errores = validationResult(req);
  //si existen errores, los muestra por pantalla con su codigo de estado
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  //desestructura el nombre desde el body
  const { nombre } = req.body;
  //crea un objeto en una constante
  const nuevoProyecto = {};

  //si existe un nombre se lo asigna al objeto
  if (nombre) {
    nuevoProyecto.nombre = nombre;
  }

  try {
    //asigna los proyectos segun su id
    let proyecto = await Proyecto.findById(req.params.id);

    //de no existir el proyecto responde con un error y su codigo
    if (!proyecto) {
      return res.status(404).json({ msg: "Proyecto no encontrado" });
    }

    //si el creador del proyecto es distinto al del id del usuario responde con un error y su codigo
    if (proyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }

    //busca el proyecto por Id y lo actualiza con sus nuevos cambios desde nuevoProyecto
    proyecto = await Proyecto.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: nuevoProyecto },
      { new: true }
    );

    //lo devuelve como respuesta en formato JSON
    res.json({ proyecto });
  } catch (error) {
    console.error(error);
    res.status(500).send("Hubo un error");
  }
};

//funcion del controlador que elimina un proyecto
exports.eliminarProyecto = async (req, res) => {
  try {
    //asigna los proyectos segun su Id
    let proyecto = await Proyecto.findById(req.params.id);

    //de no existir proyecto devuelve un error y su codigo
    if (!proyecto) {
      return res.status(404).json({ msg: "Proyecto no encontrado" });
    }

    //si el creador del proyecto es distinto al del id del usuario responde con un error y su codigo
    if (proyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }

    //remueve el proyecto segun el Id
    await Proyecto.findOneAndRemove({ _id: req.params.id });
    //lo devuelve como respuesta en formato JSON
    res.json({ msg: "Proyecto eliminado" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Hubo un error");
  }
};
