const { Router } = require('express');
const { getUser, getUserId, createUser, updateUser, deleteUser } = require('../controller/userController');
const { userValidation } = require('../middlewares/validateUser');


const router = Router()
router.get('/api/users', getUser);
router.get('/api/users/:id', getUserId)
router.post('/api/users/create', userValidation, createUser)
router.put('/api/users/update/:id', userValidation, updateUser);
router.delete('/api/users/eliminate/:id', deleteUser)


module.exports = {
    userRoutes: router
}