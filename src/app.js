const express = require('express');
const app = express();

/*** Conexion a MongoDB ***/
require('dotenv').config()
const conexion = require('./database/dbConexion')

const methodOverride = require('method-override'); // Para poder usar los métodos PUT y DELETE
const path = require('path'); //Es necesario para que la carpeta views pueda estar adentro de la carpeta src

/********Middlewares ********/
app.use(express.static(path.join(__dirname, '../public')));  // Necesario para los archivos estáticos en el folder /public
/*** PUT, DELTE,  ***/
app.use(methodOverride('_method'));//Para crear, eliminar y modificar.. se puede poner cualquier nombre en '_method'
/*** EJS ***/
app.set('view engine', 'ejs'); 
app.set('views', path.join(__dirname, '/views'));
/***Cappturar informacion que viene del body ***/
app.use(express.urlencoded({ extended: false })); // Para capturar el body
app.use(express.json()); // Para capturar el body
/*** session Login ***/
/* app.use(session({ //npm i express-session. Para bloquear a alguno usuarios que no estan loguados // const session = require('express-session');
    secret: "Shh, It's a secret",
    resave: false,
    saveUninitialized: false,
})); */

/*** Routers ***/
const homeRouter = require('./routes/homeRouter.js')
const productsRouter = require('./routes/productsRouter.js')
const usersRouter = require('./routes/usersRouter.js')
const pruebasRouter = require('./routes/pruebasRouter.js')
const categoryHeader = require('./middlewares/global/headerCategory')
app.use(categoryHeader)
app.use("/", /* categoryHeader, */ homeRouter);
app.use("/product", productsRouter);
app.use("/user", usersRouter);
app.use("/prueba", pruebasRouter);

/***Morgan ***/
const morgan = require('morgan');
app.use(morgan('dev'));//muestra infomacion adicional en la consela si se esta enviando informacion 



/* const Category = require('./database/models/Category')
Category.find()
    .then(function(categorias) {
      global.categorias = categorias;
      console.log(categorias)
      
    })
    .catch(function(error) {
      console.error('Error al cargar las categorías', error);
      
    }); */

/*** Levantar Servidr ***/
const port = process.env.PORT || 3030;
app.listen(port,()=> console.log('Servidor corriendo en http://localhost:' + port));
