const express = require("express");
const Producto = require("../modelos/productoModelo");
const router = express.Router();
router.use(express.json());

router.get("/obtenertodosproductos", (req, res) => {

    Producto.find({}, (err, docs) => {
        if (!err) {
            return res.send(docs);
        } else {
            console.log(err);
            console.log(docs);
            return res.status(400).json({ message: 'datos no obtenidos' })
        }
    })
});


router.get("/productobyid", (req, res) => {

    let productId = req.query.id;


    Producto.find({ _id: productId }, (err, docs) => {
        if (!err) {
            return res.send(docs[0]);
        } else {
            console.log(err);
            console.log(docs);
            return res.status(400).json({ message: 'datos no obtenidos' })
        }
    })
});

router.get("/productobycategoria", (req, res) => {

    let productCategoria = req.query.categoria;


    Producto.find({ categoria: productCategoria }, (err, docs) => {
        if (!err) {
            return res.send(docs);
        } else {
            console.log(err);
            console.log(docs);
            return res.status(400).json({ message: 'datos no obtenidos' })
        }
    })
});



router.get("/obtenerTodasCategorias", (req, res) => {
    Producto.distinct("categoria", (err, categorias) => {
        if (!err) {
            return res.json(categorias);
        } else {
            console.log(err);
            return res.status(400).json({ message: 'No se pudieron obtener las categorias' });
        }
    });
});
router.post("/addreview", async (req, res) => {
    const { review, productoid, currentUser } = req.body;

    const product = await Producto.findById({ _id: productoid });

    const reviewmodel = {
        nombre: currentUser.nombre,
        idUser: currentUser._id,
        rating: review.rating,
        comentario: review.comentario
    }

    product.reviews.push(reviewmodel);
    var rating = product.reviews.reduce((acc, x) => acc + x.rating, 0) / product.reviews.length;

    product.rating = rating;

    product.save(err => {
        if (err) {
            return res.status(400).json({ message: 'Algo salio mal' + err });
        } else {
            res.send('Su review se envio correctamente' + err);
        }
    });
});



module.exports = router