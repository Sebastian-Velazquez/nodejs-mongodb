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
      type: [{
        type: Schema.Types.ObjectId,
        ref: 'Products'
      }],
     default:[] , // [] los corcetes hacen la relacion uno a muchos
    },
    rol:{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Roles', // Referencia al modelo "Marca"
      default: '646557ed213a86fd4266fb50'
    },
  },
},
{ 
  versionKey: false // set versionKey to false to remove __v
});

//crear modelo
const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;