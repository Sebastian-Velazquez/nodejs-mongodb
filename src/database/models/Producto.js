const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productoSchema = new Schema({
  marca: String,
  name: String,
  type: String,
});

//crear modelo
const Producto = mongoose.model('Producto', productoSchema);

module.exports = Producto;