const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
  firt_name: {
    type: String,
    requierd: true,
  },
  last_name: {
    type: String,
    default:''
  },
  email: {
    type:String,
    unique: true,
    required: true,
    unique: true//quw va a ser unico
  },
  password: {
    type: String,
    requierd: true
  },
  perfil:{
    direccion: {
      type: String,
      default: ''
    },
    cp:{
      type: String,
      default: ''
    },
    image: {
      type: String,
      default: ''
    }
  }
});

//crear modelo
const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;