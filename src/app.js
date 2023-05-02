const express = require('express');
const app = express();

/*** Conexion a MongoDB */
const mongoose = require('mongoose');
const user ='sebastian';
const password ='d0iSxz8p5Alhyloc';
const dbName = 'distribuidora'
const url = `mongodb+srv://${user}:${password}@cluster0.wlzorzx.mongodb.net/?retryWrites=true&w=majority`; //Connect to your application -driver
mongoose.connect(url,
                    { useNewUrlParser: true, useUnifiedTopology: true}//para que no nos tire alvertencia en la consola
                )
                .then(()=>console.log('Base de datos conectado'))
                .catch(e => console.log(e))

const methodOverride = require('method-override'); // Para poder usar los métodos PUT y DELETE
const path = require('path'); //Es necesario para que la carpeta views pueda estar adentro de la carpeta src


app.use(express.static(path.join(__dirname, '../public')));  // Necesario para los archivos estáticos en el folder /public
/*** PUT, DELTE,  ***/
app.use(methodOverride('_method'));//Para crear, eliminar y modificar.. se puede poner cualquier nombre en '_method'

/****EJS *****/
app.set('view engine', 'ejs'); 
app.set('views', path.join(__dirname, '/views'));



const homeRouter = require('./routes/homeRouter.js')
const productsRouter = require('./routes/productsRouter.js')


app.use("/", homeRouter);
app.use("/product", productsRouter);

app.listen(3030,()=> console.log('Servidor corriendo en http://localhost:3030'));
