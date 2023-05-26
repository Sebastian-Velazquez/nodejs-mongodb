function authMiddlewares(req, res, next) {
    if (!req.session.userLogged) {//si no tengo a nadie en session
        return res.redirect('/users/login');
    }else{
        next();
    }
    
}
module.exports = authMiddlewares;