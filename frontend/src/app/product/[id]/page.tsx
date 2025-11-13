import ProductDetails from "@/views/product/item/ProductDetails";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_DOCKER_API}/product/${id}`
  );
  const product = await resp.json();
  return <ProductDetails product={product} />;
}

export default ProductPage;
