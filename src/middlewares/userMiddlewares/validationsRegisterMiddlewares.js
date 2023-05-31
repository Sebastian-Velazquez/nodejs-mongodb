const path = require("path");
const {body} = require("express-validator");
//validacion para registrarse
const validations =[
    body('firt_name').notEmpty().withMessage('Tienes que escribir tu nombre'),  
    body('email').notEmpty().withMessage('Tienes que escribir tu email').bail()
                .isEmail().withMessage('Debes escribir un formato de email correcto. Ejemplo, info@mail.com'),
    body('password').notEmpty().withMessage('Tienes que escribir un password'),
    body('repassword').custom((value, {req})=> {
        let password = req.body.password;
        let repassword =req.body.repassword;
        if (password != repassword){
        throw new Error('las contraseñas no coinciden')
    }
    return true
    }),
];
module.exports = validations;