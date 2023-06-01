const {validationResult} = require('express-validator');

const controlador ={
    index: async (req,res)=>{
        const Product = require('../database/models/Products');
        //const category = require('../database/models/Category');//llamar para hacer la relacion 
        try {
            const productos = await Product.find().populate(['category','marca']);
            
            const ultimosPoducts = productos.slice(productos.length -6);
            const destacadosFiltro = productos.filter(producto=> producto.top_seller == 1)
            const destacados = (destacadosFiltro.length< 5) ? destacadosFiltro.slice(destacadosFiltro.length - 6):destacadosFiltro.slice(destacadosFiltro.length - 3)
        
            const promedioOfertas = ()=>{                                  //creando una funcion para sacar el promedio de los productos con mejor oferta
                let productosO = productos.filter(prod=> prod.offer>0)
                let total= 0;
                productosO.forEach(prod=>{
                    total = total + prod.offer
                })
                return total/productosO.length;
            }
            
            const ofertas = productos.filter(producto=> producto.offer > promedioOfertas() )
           
           res.render("./index",{
                ultimosPoducts,
                destacados,
                ofertas
                                 })
        } catch (error) {
            res.send('error')
        }
},
    search:async (req, res)=>{
        const resultValidation = validationResult(req);//validacion
        if (resultValidation.errors.length != 0){
            res.send(resultValidation.mapped())
        }else{
        const Product = require('../database/models/Products');
        try {
            const resultado = await Product.find({ name: { $regex: req.query.search, $options: 'i' } });
            if (resultado.length > 0){
                res.render("./products/productSearch",
                { productos:resultado})
            }else{
                res.redirect('/')
            }
        } catch (error) {
            res.send('error')
        }
        }
    }
}
module.exports = controlador;