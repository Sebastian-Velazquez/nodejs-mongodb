const mongoose = require('mongoose');
const Schema = mongoose.Schema; 
//llamo al model categora
//const category = require('./Category');

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
      type: String,
      required: true
    },
    stock:{
        type: Number,
        required: true
    },
    description:{
      type: String,
      default: 'vacio'
    },
    offer:{//oferta
      type: String,
    },
    top_seller: {
      type: String
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


  const categorySchema = new Schema({
    name: {
      type: String,
      required: true
    }
  });
  

// Método de agregación para unir las colecciones "clientes" y "pedidos
productSchema.statics.aggregateClientesPedidos = async function() {
  const pedido = this;
  const resultado = await pedido.aggregate([
    {
      $lookup: {
        from: 'categories',
        localField: 'name',
        foreignField: '_id',
        as: 'cliente'
      }
    },
    {
      $unwind: '$categories'
    },
    {
      $project: {
        _id: 1,
        name: 1,
        /* productos: 1,
        'cliente.nombre': 1,
        'cliente.email': 1 */
      }
    }
  ]);

  return resultado;
};

//crear modelo
const Product = mongoose.model('Product', productSchema);
const Category = mongoose.model('Category', categorySchema);

module.exports = {Product, Category};