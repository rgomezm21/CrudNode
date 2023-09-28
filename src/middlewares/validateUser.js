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
    body('producto').isString()
                  .notEmpty().withMessage('Producto obligatorio'),
    body('cliente').isString()
                    .notEmpty().withMessage('Cliente obligatorio'),
    body('cantidad').isFloat().withMessage('Cantidad Obligatoria'),
    body('valor_pagado').isInt().withMessage('Valor_pagado Obligatorio'),
    body('fecha_compra').isISO8601().withMessage('Fecha de compra obligatoria: AAAA/MM/DD'),
  ]);

  module.exports = {
    userValidation
  }