const { Router } = require('express')
const { getUser } = require('../controller/getUser')
const { postUser } = require('../controller/postUser')
const { deleteUser } = require('../controller/deleteUser');
const { getUserId } = require('../controller/getUserId');
const { putUser } = require('../controller/putUser');
const { body, validationResult } = require('express-validator');




const validateUser = [
    body('nombre').notEmpty(),
    body('apellido').notEmpty(),
    body('edad').isInt({ min: 18 }),
    body('fecha_nacimiento').isISO8601(),
  ];

const router = Router()

router.get('/api/users', getUser);
router.post('/api/users', validateUser, postUser);
router.delete('/api/users/:idOrName', deleteUser)
router.get('/api/users/:idOrName', getUserId)
router.put('/api/users/:id', validateUser, putUser)
module.exports = {
    userRoutes: router
}