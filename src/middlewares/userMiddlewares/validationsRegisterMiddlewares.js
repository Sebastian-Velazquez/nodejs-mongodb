const path = require("path");
const {body} = require("express-validator");
//validacion para registrarse
const validations =[
    body('firt_name').notEmpty().withMessage('Tienes que escribir tu nombre').bail()
    .isLength({ min: 2, max: 12 }).withMessage('el nombre debe tener entre 3 a 12 caracteres'),  
    body('email').notEmpty().withMessage('Tienes que escribir tu email').bail()
                .isEmail().withMessage('Debes escribir un formato de email correcto. Ejemplo, info@mail.com'),
    body('password').notEmpty().withMessage('Tienes que escribir un password').bail()
    .isLength({ min: 2, max: 16 }).withMessage('el password debe tener entre 3 a 16 caracteres'),
    body('repassword').notEmpty().withMessage('Tienes que repetir la contraseña').bail()
    .custom((value, {req})=> {
        let password = req.body.password;
        let repassword =req.body.repassword;
        if (password != repassword){
        throw new Error('las contraseñas no coinciden')
    }else{
        return true
    }
    
    }),
];
module.exports = validations;