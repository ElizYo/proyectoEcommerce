const express = require("express");
const Usuario = require("../modelos/usuarioModelo");
const router = express.Router();
router.use(express.json());

router.post("/register", (req, res) => {

    const { nombre, apellido, usuario, email, password } = req.body;

    Usuario.find({ email: email, usuario: usuario }, (err, docs) => {

        if (docs.length > 0) {
            return res.status(400).json({ message: 'No se puede registrar el mismo usuario con mismo email' });
        }
        else {
            const nuevoUsuario = new Usuario({
                nombre: nombre,
                apellido: apellido,
                usuario: usuario,
                email: email,
                password: password
            })

            nuevoUsuario.save(err => {

                if (!err) {
                    res.send('Se ha registrado correctamente')
                }
                else {
                    res.send('No pudimos registrar correcamente')
                    console.log(err)
                }

            })
        }


        if (err) {

            return res.status(400).json({ message: 'Something went wrong' });
        }

    })

});


router.post("/login", (req, res) => {

    Usuario.find({ usuario: req.body.usuario, password: req.body.password }, (err, docs) => {
        if(docs.length>0)
        {
           const user = {
               nombre : docs[0].nombre , 
               _id : docs[0]._id ,
               usuario : docs[0].usuario,
           }

           res.send(user)
        }
        else{
            return res.status(400).json({ message: 'Credenciales Invalidas' });
        }
    })

});



router.get("/getallusuarios", (req, res) => {

    Usuario.find({}, (err, docs) => {

        if (err) {
            return res.status(400).json({ message: 'No se pudo obtener todos los usuarios' });
        }
        else {
            res.send(docs)
        }

    })

});

router.delete("/deleteusuario", (req, res) => {

    Usuario.findByIdAndRemove(req.body.userid, (err) => {

        if (err) {
            return res.status(400).json({ message: 'Algo salio mal' });
        }
        else {
            res.send('Usuario se elimino correctamente')
        }

    })

});


module.exports = router