const express = require("express");
const router = express.Router();


// llamamos a la ruta de controlador
const upload = require("../middlewares/userMiddlewares/multerUser");
const usersController = require("../controllers/usersController.js");
const validations = require("../middlewares/userMiddlewares/validationsRegisterMiddlewares.js");
const authMiddlewares = require("../middlewares/userMiddlewares/authMiddlewares.js");//si no tengo a nadie en session
const guestMiddlewares = require("../middlewares/userMiddlewares/guestMiddlewares.js"); //si tengo alguein es session

router.get("/register", guestMiddlewares,  usersController.register);
router.post("/register", guestMiddlewares, validations, usersController.processRegister);

router.get("/login", guestMiddlewares, usersController.login);
router.post("/login", guestMiddlewares,  usersController.processLogin);

router.get("/profile", authMiddlewares, usersController.profile);
router.put('/image', usersController.image)

router.get("/logout", authMiddlewares, usersController.logout);

router.get('/favorites', usersController.favorites)
router.put("/favorite/:id", authMiddlewares, usersController.favorite);

router.put("/editProfile/:id", upload.single('image'), usersController.editProfile);


module.exports = router;