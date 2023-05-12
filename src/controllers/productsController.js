const Category = require('../database/models/Category');
const Marca = require('../database/models/Marca');



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
    category: async (req,res)=>{
        const Product = require('../database/models/Products');
        const category = require('../database/models/Category');//llamar para hacer la relacion 
        try {
            const productos = await Product.find({category: req.params.id}).populate('category');
            console.log(productos);
            res.render("./products/category",{
                productos:productos})
            
        } catch (error) {
            res.send('error')
        }
    },
    marc:async (req,res)=>{
        const Product = require('../database/models/Products');
        /* const category = require('../database/models/Category'); */ //llamar para hacer la relacion 
        try {
            const productos = await Product.find({marca: req.params.id}).populate(['category','marca']);

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
            let product = await Product.findOne({_id: req.params.id}).populate(['category','marca']);//noombre del campo
            //console.log(productoDetail)
            //res.send(productoDetail)
            res.render("./products/productDetail",{
                product
            })
        } catch (error) {
            res.send('error')
            }
    },
    create:async (req, res)=>{ 
        const category = require('../database/models/Category');
        const marca = require('../database/models/Marca');
        let categorias = await Category.find();//noombre del campo
        let marcas = await Marca.find();
        try {
            //console.log(productoDetail)
            //res.send(productoDetail)
            res.render("./products/productCreate",{
                categorias, marcas
            })
        } catch (error) {
            res.send('error')
        }
    },
    processCreate: async (req, res)=>{ 
        const Product = require('../database/models/Products');
        console.log(req.body);
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
                    image: req.file ? req.file.filename : 'default.png'
                })
            res.render('./products/productsList')
        } catch (error) {
            res.send('error')
        }
    },
    edit: async(req,res)=>{
        const Product = require('../database/models/Products');
        const category = require('../database/models/Category');//llamar para hacer la relacion 
        const marca = require('../database/models/Marca');//llamar para hacer la relacion 
        let product = await Product.findOne({_id: req.params.id}).populate(['category','marca']);//noombre del campo de la tabla Product
        let categorias = await Category.find();//noombre del campo
        let marcas = await Marca.find();
        try {
            //res.send(product)
            res.render("./products/productEdit",{
                product,categorias, marcas
            })
        } catch (error) {
            res.send("error")
            }
    },
    processEdit: async(req, res)=>{ 
        const Product = require('../database/models/Products');
        
        try {
            let producto= Product.findOne({_id: req.params.id});
            await Product.findByIdAndUpdate( {_id: req.params.id}, 
            {
                    name: req.body.name,
                    category: req.body.category,
                    marca: req.body.marca,
                    price: req.body.price,
                    stock: req.body.stock,//hacer una funcion que traga de la bade de datos de la coleccion de de stock la cantidad y sume +1
                    description:req.body.description,
                    offer: req.body.offer,
                    top_seller: req.body.top_seller,
                    image: req.file ? req.file.filename : producto.image
                },
                { useFindAndModify: false});//viene del documento oficial de mogoose
            res.redirect("/product/list")
        } catch (error) {
            console.log(error)
            res.send(error)
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
            res.render("./products/list")
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
            res.send('error')
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
            res.send('error')
        }
    }
}

module.exports = controlador;