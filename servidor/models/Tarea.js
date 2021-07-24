const mongoose = require("mongoose");

//crea el modelo de Usuario con la ORM de mongoose
const TareaSchema = mongoose.Schema({
  nombre: {
    type: String,
    require: true,
    trim: true
  },
  estado: {
    type: Boolean,
    default: false
  },
  creado: {
    type: Date,
    default: Date.now()
  },
  proyecto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Proyecto"
  }
});

//lo exporta como modelo asignandole un nombre y su esquema
module.exports = mongoose.model("Tarea", TareaSchema);
