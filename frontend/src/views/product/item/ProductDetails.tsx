import { ProductDto } from "../Product.types";

interface ProductDetaislProps {
  product: ProductDto;
}

function ProductDetails({ product }: ProductDetaislProps) {
  return (
    <div>
      <h1 className="text-2xl font-bold">{product.name}</h1>;
      <div>{product.description}</div>
      <div>
        <span className="font-bold">Preço:</span> R${" "}
        {parseFloat(product.price).toFixed(2)}
      </div>
      <div>
        <span className="font-bold">Estoque: </span>
        {product.stock}
      </div>
    </div>
  );
}

export default ProductDetails;
