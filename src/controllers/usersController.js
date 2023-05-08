const Customer = require('../database/models/Customers');


const controlador ={
    register: (req, res)=>{
        res.render("./users/userRegister")
    },
    processRegister:async (req, res)=>{ 
        try {
            let User = await Customer.findOne({email: req.body.email});
            if (User){
                return res.render('./users/userRegister', {
                    errors: {
                        email: {msg:'Este email ya esta registrado'}
                    }, 
                    oldData: req.body 
                    }) ;
                /* console.log(User)
                res.send('el email ya existe') */
            }else{
                await Customer.create(
                    {
                        firt_name: req.body.firt_name,
                        last_name: "",
                        email: req.body.email,
                        password: req.body.password,
                        perfil: {
                            direccion: "",
                            cp: "",
                            image: 'avatar.png'
                        }
                    }
                )
                return res.render('./users/userLogin')
            }
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