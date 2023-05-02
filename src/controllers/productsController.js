const dbProducto = require('../database/models/Producto')

const controlador ={
    list: async (req,res)=>{
        try {
            let productos = await dbProducto.find()
            console.log(productos)
            res.send("hola")
            //res.render("./products/productsList")
        } catch (e) {
            console.log(e)
        }
    },
    detail:(req,res)=>{
        res.render("./products/productDetail")
    },
    create: (req, res)=>{ 
        //res.send(dbProducto);
        //res.render("./products/productCreate")
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