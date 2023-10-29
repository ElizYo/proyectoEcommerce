const mongoose = require("mongoose");

const proyecto_app = mongoose.connection.useDb("proyecto-app");

const ordenSchema = new mongoose.Schema({
    idUser : {
        type : String,
        require
    },
    nombre : {
        type : String,
        require
    },
    email : {
        type : String,
        require
    },
    ordenProductos : [{
        nombre : { type : String, require },
        cantidad : { type : Number, require },
        _id : { type: String, require},
        precio : { type : Number, require }
    }],
    direccionEnvio : {
        direccion : { type : String, require },
        ciudad : { type : String, require },
        codigoPostal : { type : Number, require },
        pais : { type : String, require }
    },
    ordenMonto : { type : Number, require },
    idTransaccion : { type : String, require },
    enviado: { type : Boolean, require }
},{
    timestamps:true
});

const Orden = proyecto_app.model('orden', ordenSchema)

module.exports= Orden