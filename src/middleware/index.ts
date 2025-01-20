import {Request, Response, NextFunction} from 'express'
import { validationResult } from 'express-validator'
import { body } from 'express-validator'

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

