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

/**
 * @swagger
 * /api/v1/products:
 *      get:
 *          summary: Get a list of products
 *          tags:
 *              - Products
 *          description: Return a list of products
 *          responses:
 *              200:
 *                  description: Succesful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Product'
 */
router.get('/', getProducts)

/**
 * @swagger
 * /api/v1/products/{id}:
 *      get:
 *          summary: Get a product by ID
 *          tags:
 *              - Products
 *          description: Return a product based on its unique ID
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The ID of the product to retrieve
 *              required: true
 *              schema:
 *                  type: integer
 *          responses:
 *              200:
 *                  description: Succesful Response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: #/components/schemas/Product
 *              400:
 *                  description: Bad request. Invalid ID
 *              404:
 *                  description: Not Found
 */
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