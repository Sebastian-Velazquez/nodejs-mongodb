const controlador ={
    list: (req,res)=>{
        res.render("./products/productsList")
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