

const Product = require('../database/models/Product');


const controlador ={
    list: async (req,res)=>{
        try {
            let productos = await Product.find();
            console.log(productos)
            res.json(productos)
            //res.render("./products/productsList")
        } catch (e) {
            console.log(e)
        }
    },
    detail: async(req,res)=>{
        try {
            let producto = await Product.findOne({_id: req.params.id});
            res.render("./products/productDetail",{
                producto:prducto
            })
        } catch (error) {
                res.json({
                    mesaje:'error al encontrar el id :',
                    error: error
                })
            }
    },
    create: (req, res)=>{ 
        
        res.render("./products/productCreate")
    },
    processCreate: async (req, res)=>{ 
        try {
            await Product.create(req.body)
            res.redirect('list')
        } catch (error) {
            console.log(error)
        }
    },
    edit: (req, res)=>{ 
        res.render("./products/productEdit")
    },
    processEdit: async(req, res)=>{ 
        try {
            let productoEditado=await Product.findByIdAndUpdate( req.params.id, req.body, { useFindAndModify: false});//viene del documento oficial de mogoose
            res.json(productoEditado)
        } catch (error) {
            console.log(error)
        }
        //res.send("Producto editado")
    },
    delete: async(req, res)=>{ 
        try {
            let producto =  await Product.findByIdAndDelete({_id: req.params.id})
            if (producto){
                res.json({
                    estado: TreeWalker,
                    mesaje:'eliminado!'
                })
            }
        } catch (error) {
            console.log(error)
        }
        res.send("El Producto fue eliminado")
    }
}

module.exports = controlador;