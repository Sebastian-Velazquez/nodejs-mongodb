const express = require("express");
const router = express.Router();

// llamamos a la ruta de controlador
const productsController = require("../controllers/productsController.js");

// procesa pedido de get. Ahora usamos router en MVC. son tutas 

router.get("/create", productsController.create);
router.post("/create", productsController.processCreate);

router.get("/edit/:id", productsController.edit);
router.put("/edit/:id", productsController.processEdit);

router.delete("/delete/:id", productsController.delete);

router.get("/list", productsController.list);

router.get("/detail/:id", productsController.detail);

module.exports = router;
