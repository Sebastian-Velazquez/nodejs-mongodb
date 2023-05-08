const Customer = require('../database/models/Customers');


const controlador ={
    register: (req, res)=>{
        res.render("./users/userRegister")
    },
    processRegister:async (req, res)=>{ 
        try {
            let productos = await Customer.findOne({email: req.params.email});
            console.log(productos)
            let nuevoUsers = await Customer.create(
                {
                    firt_name: req.body.firt_name,
                    last_name: req.body.last_name,
                    email: req.body.email,
                    password: req.body.password,
                    perfil: {
                        direccion: req.body.direccion,
                        cp: req.body.cp
                    }
                }
            )
            console.log(nuevoUsers)
            res.send('Usuario Creado')
        } catch (error) {
            console.log(error)
        }

        //res.send("Te Registraste")
    },
    login: (req, res)=>{
        res.render("./users/userLogin")
    },
    processLogin:(req,res)=>{
        res.send("Te logueaste")
    },
    profile:(req,res)=>{
        res.render("./users/userProfile")
    },
    logout:(req,res)=>{
        res.send('para salir de la session')
    }
}

module.exports = controlador;