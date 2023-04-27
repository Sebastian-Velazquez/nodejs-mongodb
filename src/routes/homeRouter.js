const express = require("express");
const router = express.Router();

// llamamos a la ruta de controlador
const homeController = require("../controllers/homeController.js");

// procesa pedido de get. Ahora usamos router en MVC. son tutas 
router.get("/", homeController.index);
router.get("/create", homeController.create);
router.get("/edit", homeController.edit);
router.get("/delete", homeController.delete);


module.exports = router;
