const { Router } = require('express');
const { search, getProduct, getProductId, createProduct, updateProduct, deleteProduct } = require('../controller/userController');
const { userValidation } = require('../middlewares/validateUser');


const router = Router()
router.get('/api/users', getProduct);
router.get('/api/search/:search', search);
router.get('/api/users/:id', getProductId)
router.post('/api/users/create', userValidation, createProduct)
router.put('/api/users/update/:id', userValidation, updateProduct);
router.delete('/api/users/eliminate/:id', deleteProduct)


module.exports = {
    userRoutes: router
}