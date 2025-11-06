import { Product } from '../../generated/prisma';

export type CreateProductDto = Pick<
  Product,
  'name' | 'price' | 'description' | 'stock' | 'status'
>;
export type UpdateProductDto = Pick<
  Product,
  'name' | 'price' | 'description' | 'stock' | 'status'
>;
