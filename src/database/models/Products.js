const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const productSchema = new Schema(
  {
    name: {
      type:String,
      required: true,
      //unique: true//quw va a ser unico
    },
    category: {
      type: String,
      required: true
    },
    marca:{
      type: String,
      required: true
    },
    stock:{
        type: Number
    },
    description:{
      type: String,
      default: 'vacio'
    },
    offer:{//oferta
      type: Boolean,
    },
    top_seller: {
      type: Boolean
    },
    image: {
      type:String,
      default: "image.png"
    },
    caracteristicas:{
      capacity_ram:{type:Number,default:""},
    },
    date:{//para saber cuando fue creado
      type: Date,
      default: Date.now
    },
  });


//crear modelo
const Product = mongoose.model('Product', productSchema);
/* const Color = mongoose.model('Color', colorSchema); */

module.exports = Product;