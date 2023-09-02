const { Router } = require('express');
const { getUser, getUserId, createUser, updateUser, deleteUser } = require('../controller/userController');
const { userValidation } = require('../middlewares/validateUser');


const router = Router()
router.get('/api/users', getUser);
router.get('/api/users/:idOrName', getUserId)
router.post('/api/users', userValidation, createUser)
router.put('/api/users/:id', userValidation, updateUser);
router.delete('/api/users/:idOrName', deleteUser)


module.exports = {
    userRoutes: router
}