const express = require('express');
const app = express();

const methodOverride = require('method-override'); // Para poder usar los métodos PUT y DELETE
const path = require('path'); //Es necesario para que la carpeta views pueda estar adentro de la carpeta src


app.use(express.static(path.join(__dirname, '../public')));  // Necesario para los archivos estáticos en el folder /public
/*** PUT, DELTE,  ***/
app.use(methodOverride('_method'));//Para crear, eliminar y modificar.. se puede poner cualquier nombre en '_method'

/****EJS *****/
app.set('view engine', 'ejs'); 
app.set('views', path.join(__dirname, '/views'));



const homeRouter = require('./routes/homeRouter.js')


app.use("/", homeRouter);

app.listen(3030,()=> console.log('Servidor corriendo en http://localhost:3030'));
