const { Router } = require('express')
const { getUser } = require('../controller/getUser')
const { postUser, validateUser } = require('../controller/postUser')
const { deleteUser } = require('../controller/deleteUser');
const { getUserId } = require('../controller/getUserId');
const { putUser } = require('../controller/putUser');

const router = Router()
router.get('/api/users', getUser);
router.get('/api/users/:idOrName', getUserId)
router.post('/api/users', validateUser, postUser);
router.put('/api/users/:id', validateUser, putUser)
router.delete('/api/users/:idOrName', deleteUser)


module.exports = {
    userRoutes: router
}