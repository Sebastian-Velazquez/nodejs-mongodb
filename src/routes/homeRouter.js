const express = require("express");
const router = express.Router();

// llamamos a la ruta de controlador
const homeController = require("../controllers/homeController.js");

//validador
const validations = require("../middlewares/productMiddlewares/searchmiddlewares.js")

// procesa pedido de get. Ahora usamos router en MVC. son tutas 
router.get("/", homeController.index);

//hacer busqueda    
router.get("/search", validations, homeController.search);

router.get("/carrito", homeController.carrito);

module.exports = router;
