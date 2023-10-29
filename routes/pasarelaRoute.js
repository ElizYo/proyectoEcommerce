const {v4 : uuidv4} = require('uuid')
const express = require("express");
const router = express.Router();
router.use(express.json());

const stripe = require("stripe")("sk_test_51O6DtGABEMRaYOZGjp4uov4debp9o5CpAX0BUOjeg4WxOsHGJlVhaAhIULMOEJ8Mi8hHYwR4uibcnP1fkVYatxfL00zOKTzLQr")
const Orden = require("../modelos/ordenModel");

router.post("/placeorder", async (req, res) => {
    const { token, articles, currentUser, total } = req.body;

    if (!token || !articles || !total) {
        return res.status(500).json({ message: 'NO DATA' });
    }

    const customer = await stripe.customers.create({
        email: token.email,
        source: token.id
    });

    const payment = await stripe.charges.create({
        amount: total * 100,
        currency: 'eur',
        customer: customer.id,
        receipt_email: token.email
    }, {
        idempotencyKey: uuidv4()
    });

    if (payment) {
        const ordenPacked = new Orden({
            idUser: currentUser._id,
            nombre: currentUser.nombre,
            email: currentUser.email,
            ordenProductos: articles,
            direccionEnvio: {
                direccion: token.card.address_line1,
                ciudad: token.card.address_city,
                pais: token.card.address_country,
                codigoPostal: token.card.address_zip
            },
            ordenMonto: total,
            idTransaccion: payment.source.id,
            enviado: false
        });

        try {
            await ordenPacked.save();
            res.send("Order placed successfully");
        } catch (err) {
            console.log("ERROR ON SAVE ORDEN", err);
            res.status(400).json({ message: "Something is wrong" });
        }
    } else {
        console.log("Payment Failed");
        return res.status(400).json({ message: 'Payment Failed' });
    }
});

router.post("/getordersbyuserid", async (req, res) => {
    const { userid } = req.body;

    Orden.find({ idUser: userid }, (err, docs) => {
        if(!err) {
            return res.send(docs);
        } else {
            console.log(err);
            return res.status(400).json({message : 'Datos de ordebes no obtenidos'})
        }
    })

})

module.exports = router