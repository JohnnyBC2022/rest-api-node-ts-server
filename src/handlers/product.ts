import { Request, Response } from 'express';
import Product from '../models/Product.model';

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll()
    /*
    Si queremos cambiar el orden en que traerlos, podemos hacer lo siguiente:
    const products = await Product.findAll({
      order: [
        ['price', 'DESC']  o ordenarlos como queramos por id, etc...
      ],
      limit: 2, // si queremos traer un límite de productos
      attributes: {excluded: ['createdAt', 'updatedAt']} para no traernos algún atributo
    })
    */
    res.json({ data: products })
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los productos' });
  }
}

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ data: product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear el producto' });
  }
};

