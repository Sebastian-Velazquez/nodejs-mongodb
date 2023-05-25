const express = require("express");
const router = express.Router();
// llamamos a la ruta de controlador
const productsController = require("../controllers/productsController.js");

//middlewares
const upload = require("../middlewares/multer");
const validations = require("../middlewares/productMiddlewares/validationsMiddleware.js");

// procesa pedido de get. Ahora usamos router en MVC. son tutas 

router.get("/create", productsController.create);
router.post("/create", upload.array('image'), validations, productsController.processCreate);

router.get("/edit/:id", productsController.edit);
router.put("/edit/:id", upload.array('image'), validations, productsController.processEdit);

router.delete("/delete/:id", productsController.delete);

router.get("/list", productsController.list);
router.get("/category/:id", productsController.category)
router.get("/marca/:id", productsController.marc)

router.get("/detail/:id", productsController.detail);

router.post("/createcategory", productsController.ProcessCreateCategory);
router.delete("/deletecategory/:id", productsController.deleteCategory);

router.post("/createmarca", productsController.ProcessCreateMarca);
router.delete("/deletemarca/:id", productsController.deleteMarca);

module.exports = router;
