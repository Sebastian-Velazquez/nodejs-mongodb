



const controlador ={
    list: async (req,res)=>{
        try {
            const dbProducto = require('../database/models/Product');
            let productos = await dbProducto.find();
            console.log(productos)
            res.json(productos)
            //res.render("./products/productsList")
        } catch (e) {
            console.log(e)
        }
    },
    detail:(req,res)=>{
        res.render("./products/productDetail")
    },
    create: (req, res)=>{ 
        res.render("./products/productCreate")
    },
    processCreate: (req, res)=>{ 
        res.send("Creado")
    },
    edit: (req, res)=>{ 
        res.render("./products/productEdit")
    },
    processEdit: (req, res)=>{ 
        res.send("Producto editado")
    },
    delete: (req, res)=>{ 
        res.send("El Producto fue eliminado")
    }
}

module.exports = controlador;