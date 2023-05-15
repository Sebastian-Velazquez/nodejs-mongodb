//https://github.com/validatorjs/validator.js Para buscar
const path = require("path");
const {body} = require("express-validator");

const validations =[
    body('name').notEmpty().withMessage('Tienes que escribir el nombre del producto').bail()
                .isLength({ min: 3, max: 40 }).withMessage('debe tener mas de 3 caracteres'),
    body('category').notEmpty().withMessage('Tienes que seleccionar una categoria'), 
    body('marca').notEmpty().withMessage('Tienes que seleccionar una marca'), 
    body('stock').notEmpty().withMessage('Tienes que escribir la cantidad de stock').bail()
                .isInt({ min: 0 }).withMessage('El stock del producto debe ser un número entero mayor o igual a cero'),
    body('price').notEmpty().withMessage('Tienes que escribir un precio para el producto').bail()
                .isNumeric().withMessage('Tienes que escribir un numero correcto').bail()
                .isLength({ min: 2, max: 9 }).withMessage('Debe tener entre 3 a 9 caracteres'),
    body('top_seller').notEmpty().withMessage('Tienes que seleccionar una opción de destacado'),
    body('model').notEmpty().withMessage('Tienes que seleccionar un modelo'),
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