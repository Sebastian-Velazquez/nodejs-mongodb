const mongoose = require('mongoose');
const Schema = mongoose.Schema; 


const productSchema = new Schema(
  {
    name: {
      type:String,
      //required: true,
      //unique: true//quw va a ser unico
      default: ''
    },
    category:{
      type: mongoose.Schema.Types.ObjectId,
      //required: true,
      ref: 'Category' // Referencia al modelo "Category"
    },
    marca:{
      type: String,
      //required: true
      default: ''
    },
    stock:{
        type: String,
        //required: true
        default: ''
    },
    description:{
      type: String,
      default: ''
    },
    offer:{//oferta
      type: String,
      default: ''
    },
    top_seller: {
      type: String,
      default: ''
    },
    image: {
      type:String,
      default: "image.png"
    },
    caracteristicas:{
      capacity_ram:{type:String,default:""},
    },
    date:{//para saber cuando fue creado
      type: Date,
      default: Date.now
    },
  });
 
//crear modelo
const Product = mongoose.model('Product', productSchema);
//const Category = mongoose.model('Category', categorySchema);

module.exports = Product;
//module.exports = {Product, Category};