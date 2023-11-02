const express = require("express");
const Producto = require("../modelos/productoModelo");
const router = express.Router();
router.use(express.json());
const fs = require('fs');
const path = require('path');
const multiparty = require('multiparty');
const { Console } = require("console");

// Configura la carpeta de destino para guardar los archivos
const uploadDir = path.join(__dirname, '../static/assets/images');

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


router.post("/addproduct", (req, res) => {

    const form = new multiparty.Form({ uploadDir });

    form.parse(req, (err, fields, files) => {
        console.log(fields);
        if (err) {
            console.log("file_error", err);
            return res.status(500).send('Error al procesar el archivo.');
        }

        const nombre = fields.nombre[0];
        const precio = fields.precio[0];
        const stock = fields.stock[0];
        const categoria = fields.categoria[0];
        const descripcion = fields.descripcion[0];


        Producto.findOne({ nombre: nombre }, (err, existingProduct) => {
            if (err) {
                return res.status(500).json({ message: 'Error al buscar el producto en la base de datos' });
            }

            if (existingProduct) {
                return res.status(400).json({ message: 'El producto ya existe en la base de datos' });
                
            } else {
               
                const nuevoProducto  = {
                    nombre: nombre,
                    precio: precio,
                    stock: stock,
                    categoria: categoria,
                    descripcion: descripcion
                };


                if (files.image != undefined) {

                    // files contiene la información del archivo subido
                    const file = files.image[0];
                    const originalFileName = file.originalFilename;
                    const tempPath = file.path;
        
                    // Mueve el archivo a su ubicación final
                    const targetPath = path.join(uploadDir, originalFileName);
        
                    nuevoProducto.image = originalFileName;
        
                    fs.rename(tempPath, targetPath, (err) => {
        
                        if (err) {
                            return res.status(500).send('Error al mover el archivo.');
                        }
        
                    })
                }

                const productoNuevo = new Producto(nuevoProducto);

                productoNuevo.save(err => {
                    if (!err) {
                        res.status(201).json({ message: 'Producto agregado correctamente' });
                    } else {
                        res.status(500).json({ message: 'No se pudo agregar el producto correctamente' });
                        console.error(err);
                    }
                });
            }
        });
    });
});

router.put("/updateproduct", (req, res) => {

    const form = new multiparty.Form({ uploadDir });

    form.parse(req, (err, fields, files) => {

        if (err) {
            console.log("file_error", err);
            return res.status(500).send('Error al procesar el archivo.');
        }

        let product_id = fields.producto_id[0];

        let objectDataToUpdate = {
            nombre: fields.nombre[0],
            precio: fields.precio[0],
            stock: fields.stock[0],
            categoria: fields.categoria[0],
            descripcion: fields.descripcion[0]

        }

        if (files.image != undefined) {

            // files contiene la información del archivo subido
            const file = files.image[0];
            const originalFileName = file.originalFilename;
            const tempPath = file.path;

            // Mueve el archivo a su ubicación final
            const targetPath = path.join(uploadDir, originalFileName);

            objectDataToUpdate.image = originalFileName;

            fs.rename(tempPath, targetPath, (err) => {

                if (err) {
                    return res.status(500).send('Error al mover el archivo.');
                }

            })
        }

        Producto.findByIdAndUpdate(product_id, objectDataToUpdate, (err) => {

            if (err) {
                return res.status(400).json({ message: 'Something went wrong' + err });
            }
            else {
                res.send('Product Updated Successfully')
            }

        })
    });


});



router.delete("/deleteproduct", (req, res) => {
    Producto.findByIdAndRemove(req.body.productoid, (err) => {

        if (err) {
            return res.status(400).json({ message: 'Algo salio mal' });
        }
        else {
            res.send('Producto eliminado correctamente')
        }

    })
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