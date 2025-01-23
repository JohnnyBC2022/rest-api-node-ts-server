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
 *                  description: Succesfully response
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
 *                  description: Succesfully Response
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

/**
 * @swagger
 * /api/v1/products:
 *      post:
 *          summary: Creates a new product
 *          tags:
 *              - Products
 *          description: Returns a new record in the database
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  example: "Teléfono móvil"
 *                              price:
 *                                  type: number
 *                                  example: 249.99
 *          responses:
 *              201:
 *                  description: Sucessfully response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *              400:
 *                  description: Bad Request - Invalid input data
 */
router.post('/',
    validateProduct,
    handleInputErrors,
    createProduct
)

/**
 * @swagger
 * /api/v1/products/{id}:
 *      put:
 *          summary: Updates a product with user input
 *          tags:
 *              - Products
 *          description: Returns the updated product
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The ID of the product to retrieve
 *              required: true
 *              schema:
 *                  type: integer
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  example: "Teléfono móvil"
 *                              price:
 *                                  type: number
 *                                  example: 249.99
 *                              availability:
 *                                  type: boolean
 *                                  example: true
 *          responses:
 *              200:
 *                  description: Sucessfully response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *              400:
 *                  description: Bad Request - Invalid ID or Invalid input data
 *              404:
 *                  description: Product Not Found
 */
router.put('/:id',
    validateId,
    validateUpdatedProduct,
    handleInputErrors,
    updateProduct)

/**
 * @swagger
 * /api/v1/products/{id}:
 *      patch:
 *          summary: Update Product availability
 *          tags:
 *              - Products
 *          description: Returns the updated availability
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The ID of the product to retrieve
 *              required: true
 *              schema:
 *                  type: integer
 *          responses:
 *              200:
 *                  description: Sucessfully response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *              400:
 *                  description: Bad Request - Invalid ID
 *              404:
 *                  description: Product Not Found
 */
router.patch('/:id',
    validateId,
    handleInputErrors,
    updateAvailability
)

/**
 * @swagger
 * /api/v1/products/{id}:
 *      delete:
 *          summary: Deletes a product by a given ID
 *          tags:
 *              - Products
 *          description: Returns a confirmation message
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The ID of the product to delete
 *              required: true
 *              schema:
 *                  type: integer
 *          responses:
 *              200:
 *                  description: Sucessfully response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: string
 *                              value: 'Producto eliminado'
 *              400:
 *                  description: Bad Request - Invalid ID
 *              404:
 *                  description: Product Not Found
 */
router.delete('/:id',
    validateId,
    handleInputErrors,
    deleteProduct
)

export default router