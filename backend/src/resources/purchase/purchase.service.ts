import { PrismaClient, Purchase, PurchaseItem } from '../../generated/prisma';
import { PurchaseStatus } from './purchase.constants';

const prisma = new PrismaClient();

export const getCart = async (userId: string): Promise<Purchase> => {
  let cart = await prisma.purchase.findFirst({
    where: {
      userId,
      status: PurchaseStatus.cart,
    },
  });
  if (!cart) {
    cart = await prisma.purchase.create({
      data: {
        userId,
        status: PurchaseStatus.cart,
      },
    });
  }
  return cart;
};

export const getCartItems = async (userId: string): Promise<PurchaseItem[]> => {
  const cart = await getCart(userId);
  return prisma.purchaseItem.findMany({
    where: {
      purchaseId: cart.id,
    },
  });
};
