const producto = require('../database/models/Products')


const controlador ={
    prueba:async (req, res)=>{
        try {
            let productos = await producto.findOne({_id: req.params.id}).populate('category');

            console.log(productos)
            
            res.send(productos) 
            /* res.render("./products/productsList",{
                productos:productos
            }) */
        } catch (e) {
            console.log(e)
        }
}
}

module.exports = controlador;