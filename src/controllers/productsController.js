


const controlador ={
    list: async (req,res)=>{
        const Product = require('../database/models/Products');
        const category = require('../database/models/Category');//llamar para hacer la relacion 
        try {
            const productos = await Product.find().populate('category');
           /*  res.send(productos) */
            res.render("./products/productsList",{
                productos:productos})
            
        } catch (e) {
            console.log(e)
        }
    },
    detail: async(req,res)=>{
        const Product = require('../database/models/Products');
        const category = require('../database/models/Category');//llamar para hacer la relacion 
        try {
            let productoDetail = await Product.findOne({_id: req.params.id}).populate('category');//noombre del campo
            console.log(productoDetail.category.name)
            res.send(productoDetail)
            /* res.render("./products/productDetail",{
                producto:productoDetail
            }) */
        } catch (error) {
                res.json({
                    mesaje:'error al encontrar el id :',
                    error: error
                })
            }
    },
    create:async (req, res)=>{ 
        try {
            res.render("./products/productCreate")
        } catch (error) {
            console.log(error)
        }
        
    },
    processCreate: async (req, res)=>{ 
        const Product = require('../database/models/Products');
        const category = require('../database/models/Category');//llamar para hacer la relacion 
        try {
            if( req.body.name && req.body.category && req.body.marca && req.body.price && req.body.stock){//para que no se crashee
                await Product.create({
                    name: req.body.name,
                    category: req.body.category,
                    marca: req.body.marca,
                    price: req.body.price,
                    stock: req.body.stock,//hacer una funcion que traga de la bade de datos de la coleccion de de stock la cantidad y sume +1
                    description:req.body.description,
                    offer: req.body.offer,
                    top_seller: req.body.top_seller,
                    image:  'req.file.filename',
                    date:req.body.date,
                })
            }
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
            let productoEditado=await Product.findByIdAndUpdate( req.params.id, 
                {
                    name: req.body.name,
                    category: req.body.category,
                    marca: req.body.marca,
                    category: req.body.category,
                    stock: req.body.stock,//hacer una funcion que traga de la bade de datos de la coleccion de de stock la cantidad y sume +1
                    description:req.body.description,
                    offer: req.body.offer,
                    top_seller: req.body.top_seller,
                    image:  'req.file.filename',
                    date:req.body.date,
                },
                { useFindAndModify: false});//viene del documento oficial de mogoose
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