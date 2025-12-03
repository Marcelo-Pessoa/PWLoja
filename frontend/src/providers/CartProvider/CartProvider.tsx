"use client";

import api from "@/utils/api";
import { createContext, ReactNode, useState } from "react";

interface CartContextProps {
  cartProducts: Record<string, number>;
  incCartProduct: (productId: string) => void;
  decCartProduct: (productId: string) => void;
}

const initialCart: CartContextProps = {
  cartProducts: {},
  incCartProduct: () => {},
  decCartProduct: () => {},
};

export const CartContext = createContext<CartContextProps>(initialCart);

function CartProvider({ children }: { children: ReactNode }) {
  const [cartProducts, setCartProducts] = useState<Record<string, number>>({});
  const incCartProduct = async (productId: string) => {
    try {
      await api.post("/purchaseItem/inc", { productId });
    } catch (err) {
      console.log(err);
      return;
    }
    setCartProducts((c) => ({
      ...c,
      [productId]: (c[productId] ?? 0) + 1,
    }));
  };

  const decCartProduct = async (productId: string) => {
    try {
      await api.post("/purchaseItem/dec", { productId });
    } catch (err) {
      console.log(err);
      return;
    }
    if (cartProducts[productId] === 1) {
      const copyCartProducts = { ...cartProducts };
      delete copyCartProducts[productId];

      setCartProducts(copyCartProducts);
    } else {
      setCartProducts((c) => ({
        ...c,
        [productId]: c[productId] - 1,
      }));
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        incCartProduct,
        decCartProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
