const Product = require('../database/models/Products');






const controlador ={
    list: async (req,res)=>{
        try {
            let productos = await Product.find();
            res.send(productos)
            /* res.render("./products/productsList",{
                productos:productos
            }) */
        } catch (e) {
            console.log(e)
        }
    },
    detail: async(req,res)=>{
        try {
            let productoDetail = await Product.findOne({_id: req.params.id}).populate('category');
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
            console.log(nuevoProducto)
        } catch (error) {
            console.log(error)
        }
        
    },
    processCreate: async (req, res)=>{ 
        try {
            let nuevoProducto = await Product.create({
                name: req.body.name,
                category: req.body.category,
                marca: req.body.marca,
                stock: req.body.stock,//hacer una funcion que traga de la bade de datos de la coleccion de de stock la cantidad y sume +1
                description:req.body.description,
                offer: req.body.offer,
                top_seller: req.body.top_seller,
                image:  'req.file.filename',
                caracteristicas:{
                capacity_ram: req.body.capacity_ram,
                },
                date:req.body.date,
            })
            console.log(nuevoProducto)
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
                    stock: req.body.stock,//hacer una funcion que traga de la bade de datos de la coleccion de de stock la cantidad y sume +1
                    description:req.body.description,
                    offer: req.body.offer,
                    top_seller: req.body.top_seller,
                    image:  'req.file.filename',
                    caracteristicas:{
                    capacity_ram: req.body.capacity_ram,
                    },
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