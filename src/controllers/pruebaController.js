const producto = require('../database/models/Products')



const Category = require('../database/models/Category')

const controlador ={
    prueba:async (req, res)=>{
        try {
            let productos = await producto.findOne({_id: req.params.id}
            /* await producto.aggregate([
                {
                    $lookup:{
                        from: 'categories',//collecion a relacionar
                        localField:'category',
                        foreignField: '_id',
                        as: 'categoria'
                    }
                }
            ]) */
            ).populate('category');

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