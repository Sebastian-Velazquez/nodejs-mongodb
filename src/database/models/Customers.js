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
    required: true,
    unique: true,//no se puede repetir el mail
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
  },
},
{ 
  versionKey: false // set versionKey to false to remove __v
});

//crear modelo
const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;