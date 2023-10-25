const express = require('express');
const router = express.Router();
const path = require("path");

//Example
router.post("/api/get_subjects", (req, res) => {
    res.json([{"id":1,"value":"Información"},{"id":2,"value":"Incidencia técnica"},{"id":3,"value":"Otros"}]);
});


// Importa productosRoute
const productosRoute = require('./routes/productoRoute');
const usuarioRoute = require('./routes/usuarioRoute');


// Usar productosRoute con la ruta /api/productos
router.use('/api/productos', productosRoute);
router.use('/api/usuarios', usuarioRoute);


module.exports = router; // Exporta el enrutador