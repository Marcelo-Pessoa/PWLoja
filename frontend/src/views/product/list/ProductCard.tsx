"use client";

import { Card } from "flowbite-react";
import { memo, useContext, useState } from "react";
import Link from "next/link";
import { FaMinus, FaPlus } from "react-icons/fa";
import styles from "../Product.module.css";
import { ProductDto } from "../Product.types";
import { CartContext } from "@/providers/CartProvider/CartProvider";

interface ProductCardProps {
  product: ProductDto;
}

function ProductCard({ product }: ProductCardProps) {
  const { cartProducts, incCartProduct, decCartProduct } =
    useContext(CartContext);
  const qtdCart = cartProducts[product.id];
  const decreaseCart = () => decCartProduct(product.id);
  const increaseCart = () => incCartProduct(product.id);

  return (
    <Card className="max-w-sm">
      <div className=" flex flex-col justify-between h-full">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          <Link href={`/product/${product.id}`}>{product.name}</Link>
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {product.description}
        </p>
        <p className="flex gap-2">
          <button
            className={styles.buttonIcon}
            onClick={decreaseCart}
            disabled={qtdCart === 0}
          >
            <FaMinus />
          </button>
          {qtdCart}
          <button className={styles.buttonIcon} onClick={increaseCart}>
            <FaPlus />
          </button>
        </p>
      </div>
    </Card>
  );
}

export default memo(ProductCard);
