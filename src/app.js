const express = require('express');
const app = express();

const path = require('path'); //Es necesario para que la carpeta views pueda estar adentro de la carpeta src

app.use(express.static(path.join(__dirname, '../public')));  // Necesario para los archivos estáticos en el folder /public

const homeRouter = require('./routes/homeRouter.js')


app.use("/", homeRouter);

app.listen(3030,()=> console.log('Levantando un servidor con Express'));

app.get('/', (req, res) => res.send('¡Hola Mundo!'));