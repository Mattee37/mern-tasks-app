import React, { useContext, useState, useEffect } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from "../../context/tareas/tareaContext";

const FormTask = () => {
  const proyectosContext = useContext(proyectoContext);
  const { proyecto } = proyectosContext;

  const tareasContext = useContext(tareaContext);
  const {
    agregarTarea,
    validarTarea,
    errortarea,
    obtenerTareas,
    tareaseleccioanda,
    actualizarTarea
  } = tareasContext;

  const [tarea, setTarea] = useState({
    nombre: ""
  });

  useEffect(() => {
    if (tareaseleccioanda !== null) {
      setTarea(tareaseleccioanda);
    } else {
      setTarea({
        nombre: ""
      });
    }
  }, [tareaseleccioanda]);

  const { nombre } = tarea;

  if (!proyecto) return null;

  const [proyectoActual] = proyecto;

  const onChange = e => {
    setTarea({
      ...tarea,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = e => {
    e.preventDefault();

    if (nombre.trim() === "") {
      validarTarea();
      return;
    }

    if (tareaseleccioanda === null) {
      tarea.proyecto = proyectoActual._id;
      agregarTarea(tarea);
    } else {
      actualizarTarea(tarea);
    }

    obtenerTareas(proyectoActual.id);

    setTarea({
      nombre: ""
    });
  };

  return (
    <div className="formulario">
      <form onSubmit={onSubmit}>
        <div className="contenedor-input">
          <input
            type="text"
            className="input-text"
            placeholder="Nombre de la tarea"
            name="nombre"
            value={nombre}
            onChange={onChange}
          />
        </div>
        <div className="contenedor-input">
          <input
            type="submit"
            className="btn btn-primario btn-submit btn-block"
            value={tareaseleccioanda ? "Editar Tarea" : "Agregar tarea"}
          />
        </div>
      </form>
      {errortarea ? (
        <h2 className="mensaje error">El nombre de la tarea es obligatorio.</h2>
      ) : null}
    </div>
  );
};

export default FormTask;
