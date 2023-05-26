function userAdmin(req, res, next) {
    if (req.session.userLogged) {//si tengo a nadie en session
        if(req.session.userLogged.perfil.rol == "6465582c213a86fd4266fb51"){ //si tengo alguien en session y  es admin
            next();
        }else{
            return res.redirect('/');
        }
    }else{
    return res.redirect('/');
    }
}
module.exports = userAdmin;