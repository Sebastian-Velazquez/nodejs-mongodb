

let db = require("../../database/models/Customers");

function userLoggedMiddleware(req, res, next) {
    res.locals.isLogged = false;//res.locals en es variable local.. se puede compartir en todas las vistas

    if (req.cookies.userEmail){
        console.log(req.cookies.userEmail)
        db.findOne(
            {
                email: req.cookies.userEmail
            })
            .then(dato =>{
            if (dato){
                //console.log(dato.email)
                req.session.userLogged = dato;
                res.locals.isLogged = true;
                res.locals.userLogged = req.session.userLogged;
            }
        })
    }

    //para trabajar en las vistas que el con los datos para rederizar las vistas como por ejemplo, no mostrar una parte si el usuario esta logueado
    if(req.session && req.session.userLogged){
    res.locals.isLogged = true;
    //pasa las variables que tiene en session a locals
    res.locals.userLogged = req.session.userLogged;//para poder usar variables locales que puedan ser usadas en distitas vistas.
    }


    next(); 
}
module.exports = userLoggedMiddleware;