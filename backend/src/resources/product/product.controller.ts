import { Request, Response } from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import {
  createProduct,
  productAlreadyExists,
  getAllProducts,
  getProduct,
  updateProduct,
  removeProduct,
} from './product.service';
import { CreateProductDto, UpdateProductDto } from './product.types';

const index = async (req: Request, res: Response) => {
  try {
    const products = await getAllProducts();
    res.status(StatusCodes.OK).json(products);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

const create = async (req: Request, res: Response) => {
  const product = req.body as CreateProductDto;

  try {
    if (await productAlreadyExists(product.name)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ReasonPhrases.BAD_REQUEST);
    }

    const newProduct = await createProduct(product);
    res.status(StatusCodes.CREATED).json(newProduct);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

const read = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ReasonPhrases.BAD_REQUEST);
    }
    const product = await getProduct(id);
    res.status(StatusCodes.OK).json(product);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

const update = async (req: Request, res: Response) => {
  const product = req.body as UpdateProductDto;
  const { id } = req.params;

  try {
    if (!id || !(await productAlreadyExists(product.name))) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ReasonPhrases.BAD_REQUEST);
    }

    const newProduct = await updateProduct(id, product);
    res.status(StatusCodes.CREATED).json(newProduct);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};
const remove = async (req: Request, res: Response) => {
  try {
    const product = await removeProduct(req.params.id!);

    if (product) {
      return res.status(StatusCodes.NO_CONTENT);
    }

    res.status(StatusCodes.NOT_FOUND).json(ReasonPhrases.NOT_FOUND);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

export default { index, create, read, update, remove };
