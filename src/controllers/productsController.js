


const controlador ={
    list: async (req,res)=>{
        const Product = require('../database/models/Products');
        //const category = require('../database/models/Category');//llamar para hacer la relacion 
        try {
            const productos = await Product.find()//.populate('category');

            res.render("./products/productsList",{
                productos:productos})
        } catch (error) {
            req.render('./index')
        }
    },
    category: async (req,res)=>{
        const Product = require('../database/models/Products');
        const category = require('../database/models/Category');//llamar para hacer la relacion 
        try {
            const productos = await Product.find().populate('category');

            res.render("./products/category",{
                productos:productos})
            
        } catch (error) {
            res.send('error')
        }
    },
    marc:async (req,res)=>{
        const Product = require('../database/models/Products');
        const category = require('../database/models/Category');//llamar para hacer la relacion 
        try {
            const productos = await Product.find().populate('category');

            res.render("./products/marca",{
                productos:productos})
            
        } catch (error) {
            res.send('error')
        }
    }
    ,
    detail: async(req,res)=>{
        const Product = require('../database/models/Products');
        //const category = require('../database/models/Category');//llamar para hacer la relacion 
        //const marca = require('../database/models/Marca');//llamar para hacer la relacion 
        try {
            let productoDetail = await Product.findOne({_id: req.params.id}).populate(['category','marca']);//noombre del campo
            //console.log(productoDetail)
            //res.send(productoDetail)
            res.render("./products/productDetail",{
                producto:productoDetail
            })
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
                    image: 'imagen.png' //'req.file.filename'
                })
            res.render('./products/productsList')
        } catch (error) {
            res.render("./products/productCreate",{
                oldData: req.body
            })
        }
    },
    edit: async(req,res)=>{
        const Product = require('../database/models/Products');
        //const category = require('../database/models/Category');//llamar para hacer la relacion 
        //const marca = require('../database/models/Marca');//llamar para hacer la relacion 
        try {
            let productEdit = await Product.findOne({_id: req.params.id}).populate(['category','marca']);//noombre del campo de la tabla Product
            //res.send(productEdit)
            res.render("./products/productEdit",{
                product:productEdit
            })
        } catch (error) {
            res.render("./products/productEdit",{
                product:productEdit
            })
            }
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
            res.sen('error')
        }
        //res.send("Producto editado")
    },
    delete: async(req, res)=>{ 
        const Product = require('../database/models/Products');
        try {
            await Product.findByIdAndDelete({_id: req.params.id})
            res.render('./products/list')

        } catch (error) {
            res.send('error')
        }
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
        const Product = require('../database/models/Marca');
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
        const Category = require('../database/models/Marca');
        try {
            await Category.findByIdAndDelete({_id: req.params.id})
            res.render('./products/list')
        } catch (error) {
            res.send('No existe el producto')
        }
    }
}

module.exports = controlador;