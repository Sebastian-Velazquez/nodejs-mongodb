const mongoose = require('mongoose');
const Schema = mongoose.Schema; 


const productSchema = new Schema(
  {
    name: {
      type:String,
      required: true,
      //unique: true//quw va a ser unico
    },
    category:{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Category' // Referencia al modelo "Category"
    },
    marca:{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Marca' // Referencia al modelo "Marca"
    },
    price:{
      type: Number,
      required: true
    },
    stock:{
        type: String,
        required: true
    },
    description:{
      type: String,
      default: ''
    },
    offer:{//oferta
      type: Number,
      default: 0
    },
    top_seller: {
      type: Number,
      default: 0
    },
    image: {
      type:String,
      default: "image.png"
    },
    date:{//para saber cuando fue creado
      type: Date,
      default: Date.now
    },
  },
  { 
    versionKey: false // set versionKey to false to remove __v
  }
  );

//crear modelo
const Product = mongoose.model('Product', productSchema);
//const Category = mongoose.model('Category', categorySchema);

module.exports = Product;
//module.exports = {Product, Category};