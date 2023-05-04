const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: {
      type:String,
      require: true
    },
    image: {
      type:String,
      default: "image.png"
    },
    id: {
      type: mongoose.Types.ObjectId,
      requeride: true
    }
  });

//crear modelo
const Product = mongoose.model('Product', productSchema);

module.exports = Product;