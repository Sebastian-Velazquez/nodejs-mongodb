const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const nivelRolSchema = new Schema({
  name: String,
  default: '0'
});

//crear modelo
const NivelRol = mongoose.model('NivelRol', nivelRolSchema);

module.exports = NivelRol;