const path = require("path");
const {check} = require("express-validator");



// Middleware de validación y sanitización de la cadena de búsqueda
const validations  = [
    
    // Validar que el campo de búsqueda no esté vacío
    check('search').notEmpty().withMessage('La cadena de búsqueda no puede estar vacía'),

    // Sanitizar , seguridad para prevenir ataques
    check('search').trim().escape()


];

module.exports = validations;