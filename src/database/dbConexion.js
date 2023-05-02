const dotenv = require ('dotenv')
const mongoose = require('mongoose');
try {
    conexion = mongoose.connect(process.env.URI_MONGO)
    console.log('DB conectado')
} catch (error) {
    console.log('error de conexion a mongosDB' + error)
}

module.exports = conexion;