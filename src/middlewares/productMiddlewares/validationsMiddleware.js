//https://github.com/validatorjs/validator.js Para buscar
const path = require("path");
const {body} = require("express-validator");




/* let dato = async()=>  {
    let dato = []
    try {
      const documentos = await Category.find();
      documentos.forEach(element => {
        dato.push(element._id.toString())
    });
    console.log(dato)
    return dato
    } catch (error) {
      console.error(error);
    }
  } */


const validations =[
    body('name').notEmpty().withMessage('Tienes que escribir el nombre del producto').bail()
                .isLength({ min: 3, max: 40 }).withMessage('debe tener mas de 3 caracteres'),
    body('category').custom(async (value, {req})=> {
        const Category = require('../../database/models/Category');
            let category = req.body.category
                let dato = false
                const documentos = await Category.find();
                for (let i = 0; i < documentos.length; i++) {
                    if (documentos[i]._id.toString() == category){
                            dato = true;
                        break
                    }
                }
                if (dato==true){
                    //console.log('paso por true  :'+ dato)
                    return true
                }else{
                    //console.log('paso por false  :'+ dato)
                    throw new Error('Tienes que seleccionar una categoria')
                }
            }),
    body('marca').custom(async (value, {req})=> {
        const Marca = require('../../database/models/Marca');
            let marca = req.body.marca
                let dato = false
                const documentos = await Marca.find();
                for (let i = 0; i < documentos.length; i++) {
                    if (documentos[i]._id.toString() == marca){
                            dato = true;
                        break
                    }
                }
                if (dato==true){
                    //console.log('paso por true  :'+ dato)
                    return true
                }else{
                    //console.log('paso por false  :'+ dato)
                    throw new Error('Tienes que seleccionar una marca')
                }
            }),
    body('stock').notEmpty().withMessage('Tienes que poner la cantidad de stock').bail()
                .isInt({ min: 0 }).withMessage('El stock debe ser mayor a 0'),
    body('price').notEmpty().withMessage('Tienes que escribir un precio para el producto').bail()
                .isNumeric().withMessage('Tienes que escribir un numero correcto').bail()
                .isLength({ min: 2, max: 9 }).withMessage('Debe tener entre 3 a 9 caracteres').bail()
                .isInt({ min: 0 }).withMessage('El precio tiene que ser mayor a cero'),
    body('top_seller').isIn(['1', '2']).withMessage('Tenes que elegir un opción'),
    body('offer').isNumeric().withMessage('Tienes que escribir un numero correcto').bail()
        .isInt({ min: 0 }).withMessage('El stock debe ser mayor a 0'),
    body('description').isLength({ max: 500 }).withMessage('La descripción del producto no puede tener más de 500 caracteres'),

    body('image').custom((value, {req})=> {
        let file = req.file;
        let aceptedExtensions = ['.jpg', '.png', '.gif', '.jpeg'];
        
        if (file){
            let fileExtension = path.extname(file.originalname);
            if (!aceptedExtensions.includes(fileExtension)){
                throw new Error(`Las extensiones de archivo permitidos son ${aceptedExtensions.join(', ')}`)
            }
        }
        return true
    }),
];
module.exports = validations;