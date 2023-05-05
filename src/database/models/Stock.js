const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stockSchema = new Schema({
  name: String,
});

//crear modelo
const Stock = mongoose.model('Stock', stockSchema);

module.exports = Stock;