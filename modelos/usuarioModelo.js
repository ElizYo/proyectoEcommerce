const mongoose = require("mongoose");

const proyecto_app = mongoose.connection.useDb("proyecto-app");

const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: false
    },
    usuario: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: false
    }
})

const Usuario = proyecto_app.model('usuario', usuarioSchema)

module.exports= Usuario
