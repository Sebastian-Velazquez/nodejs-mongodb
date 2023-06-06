//-----------------Multer--------------------
const multer = require("multer");
const path = require("path");//para multerj

// creando el storage de las fotos de productos
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, "public/img/user/");
    },
    filename:(req, file, cb)=>{
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }
});


const upload = multer({storage:storage})
//-----------------Multer Fin--------------------

module.exports = upload;