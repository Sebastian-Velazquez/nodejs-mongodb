const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  marca: String,
  name: String,
  type: String,
});

//crear modelo
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;