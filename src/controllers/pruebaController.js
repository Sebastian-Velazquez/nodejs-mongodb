const producto = require('../database/models/Products')


const controlador ={
    prueba:async (req, res)=>{
        try {
            const resultado = await producto.aggregateClientesPedidos();
            res.send(resultado);
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = controlador;