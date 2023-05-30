function userAdmin(req, res, next) {
    res.locals.loggedAdmin = false;
    if (req.session.userLogged) {//si tengo a nadie en session
        if(req.session.userLogged.perfil.rol == "6465582c213a86fd4266fb51"){ //si tengo alguien en session y  es admin
            res.locals.loggedAdmin = true;
            next();
        }else{
            return res.redirect('/');
        }
    }else{
    return res.redirect('/');
    }
}
module.exports = userAdmin;