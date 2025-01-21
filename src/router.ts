import { Router } from "express"
import { createProduct, getProductById, getProducts, updateAvailability, updateProduct } from "./handlers/product"
import { handleInputErrors, validateId, validateProduct, validateUpdatedProduct } from "./middleware"
import {param} from 'express-validator'

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
    validateUpdatedProduct,
    handleInputErrors,
    updateProduct)

router.patch('/:id',
    updateAvailability
)

router.delete('/', (req, res) => {
    res.json('Desde DELETE')
})

export default router