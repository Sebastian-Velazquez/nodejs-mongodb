const dotenv = require ('dotenv')
const mongoose = require('mongoose');

    conexion = mongoose.connect(process.env.URI_MONGO, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(()=>
    console.log('DB conectado')
    )
    .catch ((error)=> {
    console.log('error de conexion a mongosDB' + error)
})

module.exports = conexion;