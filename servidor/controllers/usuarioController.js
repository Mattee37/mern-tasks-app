const Usuario = require("../models/Usuario");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.crearUsuario = async (req, res) => {
  //asigna la los posibles errores en la funcion de express-validator
  const errores = validationResult(req);

  //si existen errores, los muestra por pantalla con su codigo de estado
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  //desestructura desde le body
  const { email, password } = req.body;

  try {
    //asigna a la variable segun el email
    let usuario = await Usuario.findOne({ email });

    //de existir el usuario lo muestra por mensaje con su codigo
    if (usuario) {
      return res.status(400).json({ msg: "El usuario ya existe" });
    }

    //le asigna un nuevo Usuario con el body como parametro
    usuario = new Usuario(req.body);

    //crea el salt del encryptador
    const salt = await bcryptjs.genSalt(10);
    //hashea la password segun el salt
    usuario.password = await bcryptjs.hash(password, salt);

    //gurada el usuario en la DB
    await usuario.save();

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
    res.status(400).send("Hubo un error");
  }
};
