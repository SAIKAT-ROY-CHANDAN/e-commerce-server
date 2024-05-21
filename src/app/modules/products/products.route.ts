import express from 'express'
import productsController from './products.controller'

const router = express.Router()

router.post('/products', productsController.createProduct)
router.get('/products', productsController.getStudents)
router.get('/products/:productsId', productsController.getSingleProduct)
router.put('/products/:productsId', productsController.updateSingleProduct)

export const ProductRoutes = router