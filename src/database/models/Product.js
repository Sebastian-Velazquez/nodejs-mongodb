const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const productSchema = new Schema(
  {
    name: {
      type:String,
      require: true,
      //unique: true//quw va a ser unico
    },
    image: {
      type:String,
      default: "image.png"
    },
    date:{
      type: Date,
      default: Date.now
    },
    color:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Color',
      default: 'Azul'
    }
  });

/*   const colorSchema = new mongoose.Schema({
    name: {
      type:String,
      default: "nombrecolor"
      //unique: true//quw va a ser unico
    },
  }
  ) */
//crear modelo
const Product = mongoose.model('Product', productSchema);
/* const Color = mongoose.model('Color', colorSchema); */

module.exports = Product;