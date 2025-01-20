import { Router } from "express"
import { createProduct, getProductById, getProducts } from "./handlers/product"
import { handleInputErrors, validateId, validateProduct } from "./middleware"
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

router.put('/', (req, res) => {
    res.json('Desde PUT')
})

router.patch('/', (req, res) => {
    res.json('Desde PATCH')
})

router.delete('/', (req, res) => {
    res.json('Desde DELETE')
})

export default router