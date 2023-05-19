const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const marcaSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description:{
    type: String,
    default: ""
  },
  image:{
    type: String,
    default: 'image.png',
  },
  date:{//para saber cuando fue creado
    type: Date,
    default: Date.now
  },
},
{ 
  versionKey: false // set versionKey to false to  remove __v
});

//crear modelo
const Marca = mongoose.model('Marca', marcaSchema);

module.exports = Marca;
