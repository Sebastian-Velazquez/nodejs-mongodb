


const controlador ={
    list: async (req,res)=>{
        const Product = require('../database/models/Products');
        //const category = require('../database/models/Category');//llamar para hacer la relacion 
        try {
            const productos = await Product.find()//.populate('category');

            res.render("./products/productsList",{
                productos:productos})
            
        } catch (error) {
            res.send('error')
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
            res.send('error')
            }
    },
    create:async (req, res)=>{ 
        try {
            res.render("./products/productCreate")
        } catch (error) {
            res.send('error')
        }
        
    },
    processCreate: async (req, res)=>{ 
        const Product = require('../database/models/Products');
        try {
                await Product.create({
                    name: req.body.name,
                    category: req.body.category,
                    marca: req.body.marca,
                    price: req.body.price,
                    stock: req.body.stock,//hacer una funcion que traga de la bade de datos de la coleccion de de stock la cantidad y sume +1
                    description:req.body.description,
                    offer: req.body.offer,
                    top_seller: req.body.top_seller,
                    image:  'req.file.filename'
                })
            
        } catch (error) {
            res.render("./products/productCreate",{
                oldData: req.body
            })
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
                    image:  'req.file.filename'
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
        const Product = require('../database/models/Products');
        try {
            await Product.findByIdAndDelete({_id: req.params.id})
                res.send('eliminado')

        } catch (error) {
            console.log(error)
        }
        res.send("El Producto fue eliminado")
    },
    /*** Controladores para Adminisración */
    ProcessCreateCategory: async (req, res)=>{
        const Product = require('../database/models/Category');
        try {
            await Product.create({
                name: req.body.name,
                description: req.body.description,
            })
            res.render("./",{
                oldData: req.body
            })
        } catch (error) {
            res.send('error')
        }
    },
    deleteCategory:async(req,res)=>{
        const Category = require('../database/models/Category');
        try {
            await Category.findByIdAndDelete({_id: req.params.id})
            res.send('eliminado')
        } catch (error) {
            res.send('No existe el producto')
        }
    },
    ProcessCreateMarca: async (req, res)=>{
        const Product = require('../database/models/marca');
        try {
            await Product.create({
                name: req.body.name,
                description: req.body.description,
            })
            res.render("./",{
                oldData: req.body
            })
        } catch (error) {
            res.send('error')
        }
    },
    deleteMarca:async(req,res)=>{
        const Category = require('../database/models/marca');
        try {
            await Category.findByIdAndDelete({_id: req.params.id})
            res.send('eliminado')
        } catch (error) {
            res.send('No existe el producto')
        }
    }
}

module.exports = controlador;