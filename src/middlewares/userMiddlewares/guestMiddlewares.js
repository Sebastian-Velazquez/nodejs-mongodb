function guestMiddlewares(req, res, next) {
    if (req.session.userLogged) {//si tengo alguein es session
        return res.redirect('/user/profile');
    }
    next();
}
module.exports = guestMiddlewares;