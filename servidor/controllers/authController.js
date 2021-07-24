const Usuario = require("../models/Usuario");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

//funcion del controlador que autentica al usuario con JWT
exports.autenticarUsuario = async (req, res) => {
  //asigna la los posibles errores en la funcion de express-validator
  const errores = validationResult(req);

  //si existen errores, los muestra por pantalla con su codigo de estado
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  //desestructura del body el email y la password
  const { email, password } = req.body;

  try {
    //asigna a la variable la repsuesta de la busqueda por mongoose del email
    let usuario = await Usuario.findOne({ email });
    //si no existe el usuario lo muestra con su error
    if (!usuario) {
      return res.status(400).json({ msg: "El usuario no existe" });
    }

    //compara la contraseña encryptada con la asignada por el usuario
    const passCorrecto = await bcryptjs.compare(password, usuario.password);
    //si no es la misma muestra el error y su codigo
    if (!passCorrecto) {
      return res.status(400).json({ msg: "Password incorrecto" });
    }

    //genera el payload del JWT
    const payload = {
      usuario: {
        id: usuario.id
      }
    };

    //firma el token con su payload y la SecretWord desde el archivo de enviroments y le pasa configuraciones
    jwt.sign(
      payload,
      process.env.SECRETA,
      {
        expiresIn: 3600
      },
      (error, token) => {
        if (error) throw error;
        res.json({ token });
      }
    );
  } catch (error) {
    console.error(error);
  }
};

//funcion del controlador que autentica usuarios
exports.usuarioAutenticado = async (req, res) => {
  try {
    //asigna a la constante los usuarios segun su Id
    const usuario = await Usuario.findById(req.usuario.id).select("-password");
    //retorna la respuesta en formato JSON
    res.json({ usuario });
  } catch (error) {
    console.error(error);
    res.status(500).josn({ msg: "Hubo un error" });
  }
};
