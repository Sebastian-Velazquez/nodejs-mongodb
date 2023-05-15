//https://github.com/validatorjs/validator.js Para buscar
const path = require("path");
const {body} = require("express-validator");

const validations =[
    body('name').notEmpty().withMessage('Tienes que escribir el nombre del producto').bail()
                .isLength({ min: 3, max: 40 }).withMessage('debe tener mas de 3 caracteres'),
    body('category').isIn(['645a5695f5e94128e8c9c2f8', //TECLADO
                            '645a569cf5e94128e8c9c2fc',//MOUSE
                            '645a56a7f5e94128e8c9c300', //MEMORY RAM
                            '645a56cff5e94128e8c9c304', //DISCOS RIGIDOS
                            '645a56e6f5e94128e8c9c30c', //PLACA DE VIDEO
                            '645a56edf5e94128e8c9c310' //PLACA MADRE
                    ]).withMessage('Tienes que seleccionar una categoria'),
    body('marca').isIn(['645a755875af0a6a54f1aa7b', //Intel
                            '645a756075af0a6a54f1aa7f', //AMD
                            '645a75a475af0a6a54f1aa83', //Gigabyte
                            '645a75a975af0a6a54f1aa87', //Asus
                            '645a75b175af0a6a54f1aa8b', //AsRock
                            '645a75bb75af0a6a54f1aa8f', //Generica
                            '645a75c075af0a6a54f1aa93',//Adata
                            '645a75d175af0a6a54f1aa97',//Kingston
                            '645a75d775af0a6a54f1aa9b',//Team
                            '645a75e275af0a6a54f1aa9f',//WD
                            '645a75ec75af0a6a54f1aaa3',//Toshiba
                            '645a75fc75af0a6a54f1aaab',//Sentey
                            '645a760f75af0a6a54f1aaaf',//Thermaltake
                            '645a761a75af0a6a54f1aab3',//Deepcool
                            '645a762975af0a6a54f1aab7',//Logitech
                            '645a763275af0a6a54f1aabb',//Redragon
                            '645a764075af0a6a54f1aabf',//HyperX
                            '645a764a75af0a6a54f1aac3',//Genius
                ]).withMessage('Tienes que seleccionar una marca'),
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