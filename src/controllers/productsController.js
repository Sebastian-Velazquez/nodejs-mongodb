

const Product = require('../database/models/Product');


const controlador ={
    list: async (req,res)=>{
        try {
            let productos = await Product.find();
            res.render("./products/productsList",{
                productos:productos
            })
        } catch (e) {
            console.log(e)
        }
    },
    detail: async(req,res)=>{
        try {
            let productoDetail = await Product.findOne({_id: req.params.id});
            res.render("./products/productDetail",{
                producto:productoDetail
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
            res.render("./products/productCreate",{
                oldData: req.body
            })
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
            res.render("./products/productEdit",{
                producto:productoEditado,
                oldData: req.body
            })
        } catch (error) {
            console.log(error)
        }
        //res.send("Producto editado")
    },
    delete: async(req, res)=>{ 
        try {
            let producto =  await Product.findByIdAndDelete({_id: req.params.id})
            if (producto){
                res.render("./products/productsList")
            }
        } catch (error) {
            console.log(error)
        }
        res.send("El Producto fue eliminado")
    }
}

module.exports = controlador;