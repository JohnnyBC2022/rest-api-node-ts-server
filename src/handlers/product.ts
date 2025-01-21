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

export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      res.status(404).json({
        error: "Producto no encontrado",
      });
      return;
    }

    res.json({ data: product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el producto' });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ data: product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear el producto' });
  }
};

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  const product = await Product.findByPk(id)

  if (!product) {
    res.status(404).json({
      error: "Producto no encontrado",
    });
    return;
  }

  // Actualizar
  await product.update(req.body) //ojo que este update solo hace modificaciones parciales, es decir, solo actualiza lo que le pasemos en el body, también podemos hacer esto:
  //product.name = req.body.name
  //product.price = req.body.price
  // product.availability = req.body.availability
  // Recuerda que PUT hace modificaciones totales con lo que le estamos enviando
  await product.save()

  res.json({ data: product })
}

export const updateAvailability = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  const product = await Product.findByPk(id)

  if (!product) {
    res.status(404).json({
      error: "Producto no encontrado",
    });
    return;
  }

  // Actualizar
  product.availability = !product.dataValues.availability
  // Al hacer esto, le estamos diciendo que si la disponibilidad es true lo cambie a false y viceversa. Así nos evitamos enviar nada en el body
  await product.save()

  res.json({ data: product })
}

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  const product = await Product.findByPk(id)

  if (!product) {
    res.status(404).json({
      error: "Producto no encontrado",
    });
    return;
  }

  await product.destroy()

  res.json({ data: 'Producto eliminado' })
}