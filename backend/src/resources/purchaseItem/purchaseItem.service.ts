import { PrismaClient } from '../../generated/prisma';
import { getCart } from '../purchase/purchase.service';

const prisma = new PrismaClient();

export const incPurchaseItem = async (userId: string, productId: string) => {
  const cart = await getCart(userId);
  let purchaseItem = await prisma.purchaseItem.findFirst({
    where: {
      purchaseId: cart.id,
      productId,
    },
  });
  if (!purchaseItem) {
    purchaseItem = await prisma.purchaseItem.create({
      data: {
        purchaseId: cart.id,
        productId,
        quantity: 0,
      },
    });
  } else {
    await prisma.purchaseItem.update({
      where: {
        id: purchaseItem.id,
      },
      data: {
        purchaseId: cart.id,
        productId,
        quantity: { increment: 1 },
      },
    });
  }
};

export const decPurchaseItem = async (userId: string, productId: string) => {
  const cart = await getCart(userId);
  const purchaseItem = await prisma.purchaseItem.findFirst({
    where: {
      purchaseId: cart.id,
      productId,
    },
  });
  if (!purchaseItem)
    throw new Error(
      'Para decrementar a quantidade o produto deve estar no carrinho de compra!',
    );
  if (purchaseItem.quantity == 1) {
    await prisma.purchaseItem.delete({
      where: {
        id: purchaseItem.id,
        productId,
      },
    });
  } else {
    await prisma.purchaseItem.update({
      where: {
        id: purchaseItem.id,
      },
      data: {
        purchaseId: cart.id,
        productId,
        quantity: { decrement: 1 },
      },
    });
  }
};
