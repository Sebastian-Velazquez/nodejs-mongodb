const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: {
    type: String,
  },
  description:{
    type: String,
    default: ""
  }
},
{ 
  versionKey: false // set versionKey to false to remove __v
});

//crear modelo
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;