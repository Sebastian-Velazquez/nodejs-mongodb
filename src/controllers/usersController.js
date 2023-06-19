const Customer = require('../database/models/Customers');
const bcryptjs = require("bcryptjs");
const {validationResult} = require('express-validator');

const controlador ={
    register: (req, res)=>{
        res.render("./users/userRegister")
    },
    processRegister:async (req, res)=>{ 
        //Validacion de Middlewares
        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0){
        return res.render('./users/userRegister', {
            errors: resultValidation.mapped(), //mapped: pasa la variable resultValidation a literiario 
            oldData: req.body 
            });
        }else{
            try {
                let User = await Customer.findOne({email: req.body.email});
                if (User){
                    return res.render('./users/userRegister', {
                        errors: {
                            email: {msg:'Este email ya esta registrado'}
                        }, 
                        oldData: req.body 
                        }) ;
                }else{
                    await Customer.create(
                        {
                            first_name: req.body.firt_name,
                            last_name: "",
                            email: req.body.email,
                            password: bcryptjs.hashSync(req.body.password, 10),
                            perfil: {
                                direccion: "",
                                cp: "",
                                image: 'user-default.jpg'
                            }
                        }
                    )
                    return res.redirect('/user/login')
                }
            } catch (error) {
                console.log(error)
            }
        }
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
                        //userToLogin.unset('password');// Borrra el password para que no quede guardado.
                        userToLogin.password = undefined; 
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
        console.log(req.session.userLogged)
        return res.render('./users/userProfile',{
            user: req.session.userLogged
        })
    },
    image:(req,res)=>{
        
    },
    logout:(req,res)=>{
        req.session.userLogged = null;//para destruir la session, osea salir del login del perfil
        res.clearCookie('userEmail',);//destruir la cookie
        //req.session = null;//para destruir la session, osea salir del login del perfil
        return res.redirect('/')
    },
    favorites:async(req,res)=>{
        const Product = require('../database/models/Products');
        //const category = require('../database/models/Category');//llamar para hacer la relacion 
        try {
            const productos = await Product.find()//.populate('category');
            res.render("./products/productFavorite",{
                productos:productos})
        } catch (error) {
            res.send('error')
        }
    },
    favorite:async(req,res)=>{
        let userId= req.params.id //traer el id user
        const Customers =  require('../database/models/Customers');
        const usuario = await Customer.findOne({_id: userId});
        const agregado = usuario.perfil.favorite.indexOf(req.body.favorite)
        try {
            if(agregado == -1){
                await Customers.findByIdAndUpdate({_id: userId}, { $push: { 'perfil.favorite': req.body.favorite } }, { new: true })
                //console.log("paso por push")
                req.session.userLogged.perfil.favorite.push(req.body.favorite)

            }else{
                await Customers.findByIdAndUpdate({_id: userId}, { $pull: { 'perfil.favorite': req.body.favorite } }, { new: true })
                //console.log("paso por pull")
                let filtro = req.session.userLogged.perfil.favorite.filter(fav=> fav != req.body.favorite);
                console.log(filtro)
                req.session.userLogged.perfil.favorite = filtro
                console.log(req.session.userLogged.perfil.favorite)
            }
            res.redirect(`/product/detail/${req.body.favorite}`)
        //console.log(cliente)
        } catch (error) {
            console.log(error)
            res.send('error')
        }
    },
    userCart: (req,res)=>{
        res.render('./users/userCart')
    },
    editProfile:async(req,res)=>{
        const Customers =  require('../database/models/Customers');
        try {
            if(req.file){ /**Guardar Imagen de Perfil */
                    await Customers.findByIdAndUpdate({_id: req.params.id },{ $set: { 'perfil.image': req.file.filename }});
                    let guardar = await Customers.findByIdAndUpdate({_id: req.params.id})
                        req.session.userLogged.perfil.image = guardar.perfil.image
                    res.redirect('/user/profile')
                
            }else{
                /**Si ta existe em Email */
                let User = await Customer.findOne({email: req.body.email});
                if (User){
                    return res.render('./users/userProfile', {
                        user: req.session.userLogged,
                        errors: {
                            email: {msg:'Este email ya esta registrado'}
                        }, 
                        oldData: req.body 
                    })
                }else{
                    /**Guardar Detalles */
                    let user  = await Customers.findByIdAndUpdate({_id: req.params.id});
                    let isOkThePassword = bcryptjs.compareSync(req.body.password, user.password);
                    if  (isOkThePassword){/**Validar contraseña */
                        await Customers.findByIdAndUpdate({_id: req.params.id },/**Guar en DB */
                                { $set: {email: req.body.email ?  req.body.email : user.email, 
                                    'perfil.direccion': req.body.direction ? req.body.direction : user.perfil.direccion,
                                    'perfil.cp': req.body.cp ? req.body.cp : user.perfil.cp}});
                        let guardarSession = await Customers.findByIdAndUpdate({_id: req.params.id});
                        //Guardar los cambios en session
                        req.session.userLogged.email = guardarSession.email;
                        req.session.userLogged.perfil.direccion = guardarSession.perfil.direccion;
                        req.session.userLogged.perfil.cp = guardarSession.perfil.cp;
                        res.redirect('/user/profile')
                    }else{/**Constraseña invalida */
                        return res.render('./users/userProfile',{
                            user: req.session.userLogged,
                            errors: {
                                email: {msg:'Las credenciales no son validas'}
                            }
                        })
                    }
                }
            }
        } catch (error) {
            console.log(error)
            res.send('error')
        }
    }
}

module.exports = controlador;