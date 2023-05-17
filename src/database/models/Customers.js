const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
  first_name: {
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
    },
    favorite:{
      name: String,
    products: [{ type: Schema.Types.ObjectId, ref: 'Products' }]  // [] los corcetes hacen la relacion uno a muchos
    }
  },
},
{ 
  versionKey: false // set versionKey to false to remove __v
});

//crear modelo
const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;