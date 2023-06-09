const Category = require('../database/models/Category');
const Marca = require('../database/models/Marca');
const {validationResult} = require('express-validator');


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
            //console.log(productos);
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
            const product = await Product.findOne({_id: req.params.id}).populate(['category','marca']);//noombre del campo
            const productsCat = await Product.find({category: product.category}).populate(['category','marca']); //productos relacionados por marca y cat
            const productsSimil = productsCat.splice(productsCat.length -4)
            //console.log(product)
            //res.send(productoDetail)
            res.render("./products/productDetail",{
                product,
                productsSimil
            })
        } catch (error) {
            res.send('error')
            }
    },
    apiDetail: async(req,res)=>{
        const Product = require('../database/models/Products');
        //const category = require('../database/models/Category');//llamar para hacer la relacion 
        //const marca = require('../database/models/Marca');//llamar para hacer la relacion 
        try {
            const product = await Product.findOne({_id: req.params.id}).populate(['category','marca']);//noombre del campo
            //console.log(product)
            //res.send(productoDetail)
            res.send(product)
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
        //validacion
        const resultValidation = validationResult(req);//validacion
        if (resultValidation.errors.length > 0){
            res.render(("./products/productCreate"), { 
				errors : resultValidation.mapped(),
				oldData : req.body
			})
        }else{
            const Product = require('../database/models/Products');
            //console.log(req.body);
            try {
                // Guardar cada archivo en MongoDB y almacenar los objetos de archivo en el array
                const fileObjects = [];
                    for (let i = 0; i < 3; i++) {
                        if(req.files[i]){
                            fileObjects.push(req.files[i].filename);
                        }else{
                            fileObjects.push('default.png');
                        }
                    }

                const arrayDefault = ['default.png','default.png','default.png']
                
                    await Product.create({
                        name: req.body.name,
                        category: req.body.category,
                        marca: req.body.marca,
                        price: req.body.price,
                        stock: req.body.stock,//hacer una funcion que traga de la bade de datos de la coleccion de de stock la cantidad y sume +1
                        description:req.body.description,
                        offer: req.body.offer,
                        top_seller: req.body.top_seller,
                        image: req.files ?  fileObjects : arrayDefault
                        //image: req.files ? req.files.filename : 'default.png'
                    })
                res.redirect('/product/list')
            } catch (error) {
                console.log(error)
                res.send('error')
            }
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
        //validacion
        //console.log(req.body)
        const resultValidation = validationResult(req);//validacion
        if (resultValidation.errors.length > 0){
            res.send(resultValidation)
            }else{
                
                try {
                    // Guardar cada archivo en MongoDB y almacenar los objetos de archivo en el array
                const fileObjects = [];
                for (let i = 0; i < 3; i++) {
                    if(req.files[i]){
                        fileObjects.push(req.files[i].filename);
                    }else{
                        fileObjects.push('default.png');
                    }
                }
                const Product = require('../database/models/Products');
                let producto= await Product.findOne({_id: req.params.id});
                
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
                        image: req.files.length > 0 ? fileObjects : producto.image
                    },
                    { useFindAndModify: false});//viene del documento oficial de mogoose
                res.redirect("/product/list")
            } catch (error) {
                //console.log(error)
                res.send(error)
            }
        }   
    },
    delete: async(req, res)=>{ 
        const Product = require('../database/models/Products');
        try {
            await Product.findByIdAndDelete({_id: req.params.id})
            return res.redirect('/product/list')

        } catch (error) {
            res.send('error')
        }
    },
    /*** Controladores para Adminisración */
    createCategorMarca:async (req, res)=>{ 
        const category = require('../database/models/Category');
        const marca = require('../database/models/Marca');
        let categorias = await Category.find();//noombre del campo
        let marcas = await Marca.find();
        res.render('./products/categoryMarcaEdit',{
            categorias, marcas
        })

    },
    
    ProcessCreateCategory: async (req, res)=>{
        const Product = require('../database/models/Category');
        try {
            await Product.create({
                name: req.body.name,
                description: req.body.description,
            })
            res.redirect('/product/categorymarca')
        } catch (error) {
            res.send('error')
        }
    },
    deleteCategory:async(req,res)=>{
        const Category = require('../database/models/Category');
        try {
            await Category.findByIdAndDelete({_id: req.params.id})
            res.redirect('/product/categorymarca')
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
            res.redirect('/product/categorymarca')
        } catch (error) {
            res.send('error')
        }
    },
    deleteMarca:async(req,res)=>{
        const Category = require('../database/models/Marca');
        try {
            await Category.findByIdAndDelete({_id: req.params.id})
            res.redirect('/product/categorymarca')
        } catch (error) {
            res.send('error')
        }
    }
}

module.exports = controlador;