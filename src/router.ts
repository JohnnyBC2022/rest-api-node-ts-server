import { Router } from "express"
import { createProduct, deleteProduct, getProductById, getProducts, updateAvailability, updateProduct } from "./handlers/product"
import { handleInputErrors, validateId, validateProduct, validateUpdatedProduct } from "./middleware"
import { param } from 'express-validator'

const router = Router()

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