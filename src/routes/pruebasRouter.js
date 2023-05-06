const express = require("express");
const router = express.Router();

// llamamos a la ruta de controlador
const pruebaController = require("../controllers/pruebaController.js");

// procesa pedido de get. Ahora usamos router en MVC. son tutas 

router.post("/", pruebaController.prueba);
router.get("/", pruebaController.prueba);
module.exports = router;
