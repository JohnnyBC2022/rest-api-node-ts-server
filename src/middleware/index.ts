import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import { body, param } from 'express-validator'


export const handleInputErrors = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  next();
};


export const validateProduct = [
  body('name').notEmpty().withMessage('El nombre del producto no puede estar vacío'),
  body('price')
    .isNumeric().withMessage('El precio debe ser un número')
    .notEmpty().withMessage('El precio no puede estar vacío')
    .custom((value) => value > 0).withMessage('El precio debe ser mayor que 0'),
];

export const validateId = [
  param('id').isInt({ min: 1 }).withMessage('ID no válido'),
]

export const validateUpdatedProduct = [
  body('name').notEmpty().withMessage('El nombre del producto no puede estar vacío'),
  body('price')
    .isNumeric().withMessage('El precio debe ser un número')
    .notEmpty().withMessage('El precio no puede estar vacío')
    .custom((value) => value > 0).withMessage('El precio debe ser mayor que 0'),
  body('availability')
    .isBoolean().withMessage('Valor para disponibilidad no válido'),
];

