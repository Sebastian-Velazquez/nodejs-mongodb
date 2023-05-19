const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
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
  versionKey: false // set versionKey to false to remove __v
});

//crear modelo
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;