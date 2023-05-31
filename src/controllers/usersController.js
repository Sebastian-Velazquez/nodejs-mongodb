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
    /* favoritePull:async(req,res)=>{
        let userId= req.params.id //traer el id user
        const Customers =  require('../database/models/Customers');
        try {
        let cliente = await Customers.findByIdAndUpdate({_id: userId}, { $pull: { 'perfil.favorite': req.body.favorite } }, { new: true })
        //console.log(cliente)
        res.send(cliente)
        } catch (error) {
            console.log(error)
            res.send('error')
        }
    } */
}

module.exports = controlador;