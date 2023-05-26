const express = require("express");
const router = express.Router();
// llamamos a la ruta de controlador
const productsController = require("../controllers/productsController.js");

//middlewares
const upload = require("../middlewares/multer");
const validations = require("../middlewares/productMiddlewares/validationsMiddleware.js");
const userAdmin = require("../middlewares/userMiddlewares/userAdmin.js")
//const authMiddlewares = require("../middlewares/userMiddlewares/authMiddlewares.js");//si no tengo a nadie en session

// procesa pedido de get. Ahora usamos router en MVC. son tutas 

router.get("/create", userAdmin, productsController.create);
router.post("/create", userAdmin, upload.array('image'), validations, productsController.processCreate);

router.get("/edit/:id", userAdmin, productsController.edit);
router.put("/edit/:id", userAdmin, upload.array('image'), validations, productsController.processEdit);

router.delete("/delete/:id", userAdmin,  productsController.delete);

router.get("/list", productsController.list);
router.get("/category/:id",  productsController.category)
router.get("/marca/:id", productsController.marc)

router.get("/detail/:id", productsController.detail);

router.post("/createcategory", userAdmin, productsController.ProcessCreateCategory);
router.delete("/deletecategory/:id", userAdmin, productsController.deleteCategory);

router.post("/createmarca", userAdmin,  productsController.ProcessCreateMarca);
router.delete("/deletemarca/:id", userAdmin,  productsController.deleteMarca);

module.exports = router;
