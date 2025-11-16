"use client";

import ProductCard from "./ProductCard";
import { ProductDto } from "../Product.types";
import { TextInput } from "flowbite-react";
import { useMemo, useState } from "react";

interface ProductListProps {
  products: ProductDto[];
}

function ProductList({ products }: ProductListProps) {
  const [searchString, setSearchString] = useState("");
  const filteredProducts = useMemo(
    () =>
      products.filter((p) =>
        p.name.toLowerCase().includes(searchString.toLowerCase())
      ),
    [searchString, products]
  );

  return (
    <div>
      <div className="flex justify-between mb-2 items-center">
        <h1 className="text-2xl font-bold">Lista de Produtos</h1>
        <TextInput
          onChange={(e) => setSearchString(e.target.value)}
          value={searchString}
          className="w-80"
          type="text"
          placeholder="Busca..."
        />
      </div>
      <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}

export default ProductList;
