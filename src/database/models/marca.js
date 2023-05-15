const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const marcaSchema = new Schema({
  name: {
    type: String,
  },
  description:{
    type: String,
    default: ""
  }
},
{ 
  versionKey: false // set versionKey to false to  remove __v
});

//crear modelo
const Marca = mongoose.model('Marca', marcaSchema);

module.exports = Marca;