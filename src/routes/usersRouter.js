const express = require("express");
const router = express.Router();


// llamamos a la ruta de controlador
const usersController = require("../controllers/usersController.js");
const authMiddlewares = require("../middlewares/userMiddlewares/authMiddlewares.js");//si no tengo a nadie en session
const guestMiddlewares = require("../middlewares/userMiddlewares/guestMiddlewares.js"); //si tengo alguein es session

router.get("/register", guestMiddlewares, usersController.register);
router.post("/register", guestMiddlewares, usersController.processRegister);

router.get("/login", guestMiddlewares, usersController.login);
router.post("/login", guestMiddlewares,  usersController.processLogin);

router.get("/profile", authMiddlewares, usersController.profile);

router.get("/logout", authMiddlewares, usersController.logout);

router.put("/favorite/:id", authMiddlewares, usersController.favorite);

//router.put("/favoritePull/:id", authMiddlewares, usersController.favoritePull);


module.exports = router;