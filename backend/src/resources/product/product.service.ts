import { PrismaClient, Product } from '../../generated/prisma';
import { CreateProductDto, UpdateProductDto } from './product.types';

const prisma = new PrismaClient();

export const getAllProducts = async (): Promise<Product[]> => {
  return await prisma.product.findMany();
};

export const createProduct = async (
  product: CreateProductDto,
): Promise<Product> => {
  return await prisma.product.create({ data: product });
};

export const productAlreadyExists = async (name: string): Promise<boolean> => {
  if (await prisma.product.findFirst({ where: { name } })) return true;
  return false;
};

export const getProduct = async (id: string): Promise<Product | null> => {
  return await prisma.product.findFirst({ where: { id } });
};

export const updateProduct = async (
  id: string,
  product: UpdateProductDto,
): Promise<Product | null> => {
  return await prisma.product.update({ where: { id }, data: product });
};

export const removeProduct = async (id: string): Promise<Product | null> => {
  return await prisma.product.delete({ where: { id } });
};
