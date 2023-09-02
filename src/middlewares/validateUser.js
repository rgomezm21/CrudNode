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
    body('nombre').isString()
                  .notEmpty().withMessage('Nombre obligatorio'),
    body('apellido').isString()
                    .notEmpty().withMessage('Apellido obligatorio'),
    body('edad').isInt({ min: 18 }).withMessage('Edad Obligatoria'),
    body('fecha_nacimiento').isISO8601().withMessage('Fecha de nacimiento obligatoria'),
  ]);

  module.exports = {
    userValidation
  }