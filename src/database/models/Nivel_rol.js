const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const nivelRolSchema = new Schema({
  name: String,
  default: '0',
},
{ 
  versionKey: false // set versionKey to false to remove __v
});

//crear modelo
const NivelRol = mongoose.model('NivelRol', nivelRolSchema);

module.exports = NivelRol;