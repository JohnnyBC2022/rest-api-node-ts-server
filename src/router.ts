import { Router } from "express"
import { createProduct, deleteProduct, getProductById, getProducts, updateAvailability, updateProduct } from "./handlers/product"
import { handleInputErrors, validateId, validateProduct, validateUpdatedProduct } from "./middleware"
import { param } from 'express-validator'

const router = Router()

/**
 * @swagger
 * components:
 *    schemas:
 *      Product:
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 *                  description: The Product ID
 *                  example: 1
 *              name:
 *                  type: string
 *                  description: The Product Name
 *                  example: Ordenador Portátil
 *              price:
 *                  type: number
 *                  description: The Product price
 *                  example: 499.95
 *              availability:
 *                  type: boolean
 *                  description: The Product availability
 *                  example: true
 */

//Routing
router.get('/', getProducts)

router.get('/:id',
    validateId,
    handleInputErrors,
    getProductById
)

router.post('/',
    validateProduct,
    handleInputErrors,
    createProduct
)

router.put('/:id',
    validateId,
    validateUpdatedProduct,
    handleInputErrors,
    updateProduct)

router.patch('/:id',
    validateId,
    handleInputErrors,
    updateAvailability
)

router.delete('/:id',
    validateId,
    handleInputErrors,
    deleteProduct
)

export default router