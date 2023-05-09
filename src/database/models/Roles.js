const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rolesSchema = new Schema({
  name: {
    type: String,
    requierd: true,
  },
  nivel_id: {
    type: String,
    requierd: true,
    default: "suport"// va un ref
  }
},
{ 
  versionKey: false // set versionKey to false to remove __v
});

//crear modelo
const Roles = mongoose.model('Roles', rolesSchema);

module.exports = Roles;