const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: String,
});

//crear modelo
const Product = mongoose.model('Product', productSchema);

module.exports = Product;