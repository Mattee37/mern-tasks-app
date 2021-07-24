const mongoose = require("mongoose");

//crea el modelo de Usuario con la ORM de mongoose
const UsuarioSchema = mongoose.Schema({
  nombre: {
    type: String,
    require: true,
    trim: true
  },
  email: {
    type: String,
    require: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    require: true,
    trim: true
  },
  registro: {
    type: Date,
    default: Date.now()
  }
});

//lo exporta como modelo asignandole un nombre y su esquema
module.exports = mongoose.model("Usuario", UsuarioSchema);
