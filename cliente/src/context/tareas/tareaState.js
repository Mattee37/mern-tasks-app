import React, { useReducer } from "react";

import tareaContext from "./tareaContext";
import tareaReducer from "./tareaReducer";

import clienteAxios from "../../config/axios";

import {
  TAREAS_PROYECTOS,
  AGREGAR_TAREA,
  VALIDAR_TAREA,
  ELIMINAR_TAREA,
  TAREA_ACTUAL,
  ACTUALIZAR_TAREA
} from "../../types";

const TareaState = props => {
  const initialState = {
    id: 1,
    tareasproyecto: [],
    errortarea: false,
    tareaseleccioanda: null
  };

  const [state, dispatch] = useReducer(tareaReducer, initialState);

  const obtenerTareas = async proyecto => {
    try {
      const resultado = await clienteAxios.get("/api/tareas", {
        params: { proyecto }
      });
      dispatch({
        type: TAREAS_PROYECTOS,
        payload: resultado.data.tareas
      });
    } catch (error) {
      console.error(error);
    }
  };

  const agregarTarea = async tarea => {
    try {
      // eslint-disable-next-line
      const resultado = await clienteAxios.post("/api/tareas", tarea);
      dispatch({
        type: AGREGAR_TAREA,
        payload: tarea
      });
    } catch (error) {
      console.error(error);
    }
  };

  const validarTarea = () => {
    dispatch({
      type: VALIDAR_TAREA
    });
  };

  const eliminarTarea = async (id, proyecto) => {
    try {
      await clienteAxios.delete(`/api/tareas/${id}`, { params: { proyecto } });
      dispatch({
        type: ELIMINAR_TAREA,
        payload: id
      });
    } catch (error) {
      console.error(error);
    }
  };

  const actualizarTarea = async tarea => {
    try {
      const resultado = await clienteAxios.put(
        `/api/tareas/${tarea._id}`,
        tarea
      );
      dispatch({
        type: ACTUALIZAR_TAREA,
        payload: resultado.data.tarea
      });
    } catch (error) {
      console.error(error);
    }
  };

  const guardarTareaActual = tarea => {
    dispatch({
      type: TAREA_ACTUAL,
      payload: tarea
    });
  };

  return (
    <tareaContext.Provider
      value={{
        tareasproyecto: state.tareasproyecto,
        errortarea: state.errortarea,
        tareaseleccioanda: state.tareaseleccioanda,
        obtenerTareas,
        agregarTarea,
        validarTarea,
        eliminarTarea,
        guardarTareaActual,
        actualizarTarea
      }}
    >
      {props.children}
    </tareaContext.Provider>
  );
};

export default TareaState;
