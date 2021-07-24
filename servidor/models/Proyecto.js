const mongoose = require("mongoose");

//crea el modelo de Usuario con la ORM de mongoose
const ProyectoSchema = mongoose.Schema({
  nombre: {
    type: String,
    require: true,
    trim: true
  },
  creador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario"
  },
  creado: {
    type: Date,
    default: Date.now()
  }
});

//lo exporta como modelo asignandole un nombre y su esquema
module.exports = mongoose.model("Proyecto", ProyectoSchema);
