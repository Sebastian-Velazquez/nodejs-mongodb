function userNormal(req, res, next) {
    if (!req.session.userLogged) {//si no tengo a nadie en session
        return res.redirect('/users/login');
    }else if(req.session.userLogged.id_category == 0 ){
        return res.redirect('/');
    }
    next();
}
module.exports = userNormal;