const Category = require('../../database/models/marca')

function headerMarca(req, res, next) {
    Category.find()
    .then(function(marcas) {
      res.locals.marcas = marcas;
      console.log(res.locals.marcas)
      next();
    })
    .catch(function(error) {
      console.error('Error al cargar las categorías', error);
      next(error);
    });
    
  }

module.exports = headerMarca;