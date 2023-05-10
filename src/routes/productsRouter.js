const express = require("express");
const router = express.Router();
const multer = require ("multer");
const path = require ('path')
// llamamos a la ruta de controlador
const productsController = require("../controllers/productsController.js");

// creando el storage de las fotos de productos
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, "public/img/product/");
    },
    filename:(req, file, cb)=>{
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer ({storage: storage});

// procesa pedido de get. Ahora usamos router en MVC. son tutas 

router.get("/create", productsController.create);
router.post("/create", upload.single('image'), productsController.processCreate);

router.get("/edit/:id", productsController.edit);
router.put("/edit/:id", upload.single('image'), productsController.processEdit);

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
