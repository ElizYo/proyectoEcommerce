const express = require("express");
const Usuario = require("../modelos/usuarioModelo");
const router = express.Router();
router.use(express.json());

router.post("/register", (req, res) => {

    const { nombre, apellido, usuario, email, password, fecha_nac } = req.body;

    Usuario.find({ email: email, usuario: usuario}, (err, docs) => {

        if (docs.length > 0) {
            return res.status(400).json({ message: 'No se puede registrar el mismo usuario con mismo email' });
        }
        else {
            const nuevoUsuario = new Usuario({
                nombre: nombre,
                apellido: apellido,
                usuario: usuario,
                email: email,
                password: password,
                fecha_nac: fecha_nac,
                isAdmin: false
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

            return res.status(400).json({ message: 'Algo salio mal' });
        }

    })

});


router.post("/login", (req, res) => {

    const { usuario, password } = req.body;

    Usuario.find({ usuario: usuario, password: password }, (err, docs) => {
        if(!err) {
            if(docs.length>0) {
               const user = {
                   nombre : docs[0].nombre , 
                   _id : docs[0]._id ,
                   usuario : docs[0].usuario,
                   email : docs[0].email,
                   isAdmin : docs[0].isAdmin
               }
    
               res.send(user)
            } else {
                return res.status(400).json({ message: 'Credenciales Invalidas' });
            }
        } else {
            console.log("ERR-MODEL-USER", err);
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

router.get("/getusuariobyid", (req, res) => {

    let usuarioId = req.query.id;

    Usuario.find({_id: usuarioId}, (err, docs) => {

        if (!err) {
            return res.send(docs[0]);
        } else {
            return res.status(400).json({ message: 'datos no obtenidos' })
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

router.put("/updateusuario", (req, res) => {

    const { userid,  updateduser} = req.body;

    Usuario.findByIdAndUpdate(userid , {
        nombre : updateduser.nombre ,
        email : updateduser.email , 
        password : updateduser.password ,
        isAdmin : updateduser.isAdmin
    } , (err)=>{

        if(err){
            console.log(userid);
            return res.status(400).json({ message: 'Algo salio mal :(' + err});
        }
        else{
            res.send('Usuario actualizado correctamente')
        }

    })

})


router.delete("/deleteusuario", (req, res) => {

    Usuario.findByIdAndRemove(req.body.userid , (err)=>{

        if(err){
            return res.status(400).json({ message: 'Algo salio mal' });
        }
        else{
            res.send('Usuario eliminado correctamente')
        }

    })
  
});


module.exports = router