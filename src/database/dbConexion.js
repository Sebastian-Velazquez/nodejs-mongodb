

/*** Conexion a MongoDB */
const mongoose = require('mongoose');
const user ='sebastian';
const password ='d0iSxz8p5Alhyloc';
const dbName = 'distribuidora'
const url = `mongodb+srv://${user}:${password}@cluster0.wlzorzx.mongodb.net/${dbName}?retryWrites=true&w=majority`; //Connect to your application -driver
mongoose.connect(url,
                    { useNewUrlParser: true, useUnifiedTopology: true}//para que no nos tire alvertencia en la consola
                )
                .then(()=>console.log('Base de datos conectado'))
                .catch(e => console.log(e))

module.exports = conexion;