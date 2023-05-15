const express = require('express');
const app = express();
const session = require('express-session');
const cookie = require('cookie-parser');

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

/* const categoryHeader = require('./middlewares/global/headerCategory');
app.use(categoryHeader);
const marcaHeader = require('./middlewares/global/headerMarca');
app.use(marcaHeader) */
/*** session Login ***/
const userLoggedMiddleware = require("./middlewares/global/userLoggedMiddleware")
app.use(session({ //npm i express-session. Para bloquear a alguno usuarios que no estan loguados // const session = require('express-session');
    secret: "Shh, It's a secret",
    resave: false,
    saveUninitialized: false,
}));
app.use(cookie());
app.use(userLoggedMiddleware);

/*** Routers ***/
const homeRouter = require('./routes/homeRouter.js')
const productsRouter = require('./routes/productsRouter.js')
const usersRouter = require('./routes/usersRouter.js')

app.use("/", /* categoryHeader, */ homeRouter);
app.use("/product", productsRouter);
app.use("/user", usersRouter);

/***Morgan ***/
const morgan = require('morgan');
app.use(morgan('dev'));//muestra infomacion adicional en la consela si se esta enviando informacion 





/*** Levantar Servidr ***/
const port = process.env.PORT || 3030;
app.listen(port,()=> console.log('Servidor corriendo en http://localhost:' + port));
