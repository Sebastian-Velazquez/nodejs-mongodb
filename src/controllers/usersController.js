const Customer = require('../database/models/Customers');
const bcryptjs = require("bcryptjs");

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
                        password: bcryptjs.hashSync(req.body.password, 10),
                        perfil: {
                            direccion: "",
                            cp: "",
                            image: 'avatar.png'
                        }
                    }
                )
                return res.redirect('/user/login')
            }
        } catch (error) {
            console.log(error)
        }

        //res.send("Te Registraste")
    },
    login:(req, res)=>{
        res.render("./users/userLogin")
    },
    processLogin:(req,res)=>{   
                Customer.findOne({
                email: req.body.email
            }).then(userToLogin=>{
                if(userToLogin){
                    let isOkThePassword = bcryptjs.compareSync(req.body.password, userToLogin.password);
                    if(isOkThePassword){
                        userToLogin.password = null; // Borrra el password para que no quede guardado.
                        //Guardar el user logeado
                        req.session.userLogged =  userToLogin

                        //mantener session
                        if(req.body.remember) {
                            res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 2})
                        }
    
                        return res.redirect('/user/profile')
                    }else{
                    //si el password no es valido
                    return res.render('./users/userLogin', {
                        errors: {
                            email: {msg:'Las credenciales no son validas'}
                        }
                        })
                    }
                }else{
                    return res.render('./users/userLogin', {
                        errors: {
                            email: {msg:'Las credenciales no son validas'}
                        }
                    })
                }
            }).catch(function(error){
                res.send("error");
            })

    },
    profile:(req,res)=>{
        res.render("./users/userProfile")
    },
    logout:(req,res)=>{
        res.send('para salir de la session')
    }
}

module.exports = controlador;