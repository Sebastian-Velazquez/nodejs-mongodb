const express = require("express");
const router = express.Router();

// llamamos a la ruta de controlador
const payController = require("../controllers/payController.js");



// procesa pedido de get. Ahora usamos router en MVC. son tutas 
router.post("/create-orden", payController.createOrden);
router.get("/success", payController.success);
router.get("/failure", payController.failure);
router.get("/pending", payController.pending);

router.post("/notification", payController.notification_url);

router.get("/carrito", payController.carrito);


module.exports = router;
