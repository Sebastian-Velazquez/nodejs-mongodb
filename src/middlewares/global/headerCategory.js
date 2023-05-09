const Category = require('../../database/models/Category')

function headerCategory(req, res, next) {
    Category.find()
    .then(function(categorias) {
      res.locals.categorias = categorias;
      //console.log(res.locals.categorias)
      next();
    })
    .catch(function(error) {
      console.error('Error al cargar las categorías', error);
      next(error);
    });
    
  }

module.exports = headerCategory;