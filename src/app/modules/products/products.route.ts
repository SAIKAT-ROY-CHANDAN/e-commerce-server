import express from 'express'
import productsController from './products.controller'

const router = express.Router()

router.post('/products', productsController.createProduct)
router.get('/products', productsController.getProducts)
router.get('/products/:productsId', productsController.getSingleProduct)
router.put('/products/:productsId', productsController.updateSingleProduct)
router.delete('/products/:productsId', productsController.deleteSingleProduct)
router.post('/orders', productsController.createOrder)
router.get('/orders', productsController.getOrders);



export const ProductRoutes = router