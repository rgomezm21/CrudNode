const { body, validationResult } = require('express-validator');

const validateUser = [
    body('nombre').notEmpty(),
    body('apellido').notEmpty(),
    body('edad').isInt({ min: 18 }),
    body('fecha_nacimiento').isISO8601(),
  ];

  module.exports = {
    validateUser
  }