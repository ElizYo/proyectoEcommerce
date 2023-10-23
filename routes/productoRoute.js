const express = require("express");
const Producto = require("../modelos/productoModelo");
const router = express.Router();

router.get("/obtenertodosproductos", (req, res) => {
    /*let myProduct =  new Producto();
    myProduct.find({},(err, docs)=>{
        if(!err)
        {
            return res.json({ data : docs});
        } else {
            return res.status(400).json({message : 'datos no obtenidos'})
        }
    })*/
    Producto.find({},(err, docs)=>{
        if(!err)
        {
            return res.send(docs);
        } else {
            console.log(err);
            console.log(docs);
            return res.status(400).json({message : 'datos no obtenidos'})
        }
    })
});


router.get("/productobyid", (req, res) => {

    let productId = req.query.id;

    
    Producto.find({_id : productId},(err, docs)=>{
        if(!err)
        {
            return res.send(docs[0]);
        } else {
            console.log(err);
            console.log(docs);
            return res.status(400).json({message : 'datos no obtenidos'})
        }
    })
});

module.exports = router