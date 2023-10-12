const { body, validationResult } = require('express-validator');

const isString = (value) => {
  return typeof value === 'string';
};

const validate = validations => {
  return async (req, res, next) => {
    for (let validation of validations) {
      const result = await validation.run(req);
      if (result.errors.length) break;
    }

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res.status(400).json({ errors: errors.array() });
  };
};

const userValidation = validate([
  body('producto').isString().notEmpty().withMessage('Producto obligatorio'),
  body('cliente').isString().notEmpty().withMessage('Cliente obligatorio'),
  body('cantidad')
      .custom(value => /^\d+(\.\d{1,2})?$/.test(value))
      .withMessage('Cantidad obligatoria (entero o decimal con hasta 2 decimales)'),
  body('valor_pagado').isInt().withMessage('Valor_pagado Obligatorio'),
  body('fecha_compra').isISO8601().withMessage('Fecha de compra obligatoria: AAAA/MM/DD'),
]);

  module.exports = {
    userValidation
  }