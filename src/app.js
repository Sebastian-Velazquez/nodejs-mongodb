const express = require('express');
const app = express();

app.listen(3030,()=> console.log('Levantando un servidor con Express'));

app.get('/', (req, res) => res.send('¡Hola Mundo!'));