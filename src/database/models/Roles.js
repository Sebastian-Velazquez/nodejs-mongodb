const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rolesSchema = new Schema({
  name: String,
});

//crear modelo
const Roles = mongoose.model('Roles', rolesSchema);

module.exports = Roles;