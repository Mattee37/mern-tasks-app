const mongoose = require("mongoose");
require("dotenv").config({ path: "variables.env" });

//funcion que conecta a la DB
const conectarDB = async () => {
  try {
    //conecta a la DB y le pasa configuraciones de Mongo
    await mongoose.connect(process.env.DB_MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
    //una vez conectada la DB lo imprime por consola
    console.log("DB conectada");
  } catch (error) {
    //en caso de existir un error lo muestra y corta el proceso
    console.error(error);
    process.exit(1);
  }
};

//exporta la funcion
module.exports = conectarDB;
