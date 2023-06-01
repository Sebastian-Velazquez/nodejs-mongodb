const express = require("express");
const router = express.Router();

// llamamos a la ruta de controlador
const payController = require("../controllers/payController.js");



// procesa pedido de get. Ahora usamos router en MVC. son tutas 
router.get("/mercadopago", payController.mercadopago);
router.get("/success", payController.success);
router.post("/notification", payController.notification_url);


module.exports = router;
