const mongoose = require("mongoose");

const proyecto_app = mongoose.connection.useDb("proyecto-app");

const reviewSchema = new mongoose.Schema({
    idUser: {
        type: mongoose.Schema.Types.ObjectId
    },
    nombre: {
        type: String,
        required: true
    },
    comentario: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    }
},{
    timestamps:true
});

const productosSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    categoria: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    reviews: [reviewSchema]
},{
    timestamps:true
})

const Producto = proyecto_app.model('productos', productosSchema)

module.exports= Producto
