const express = require("express");
const router = express.Router();


// llamamos a la ruta de controlador
const usersController = require("../controllers/usersController.js");

router.get("/register", usersController.register);
router.post("/register", usersController.processRegister);

router.get("/login", usersController.login);
router.post("/login", usersController.processLogin);

router.get("/profile", usersController.profile);

router.get("/logout", usersController.logout);

router.put("/favoritePush", usersController.favoritePush);

router.put("/favoritePull", usersController.favoritePull);


module.exports = router;