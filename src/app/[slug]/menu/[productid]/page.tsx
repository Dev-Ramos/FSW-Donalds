import { notFound } from "next/navigation";

import { db } from "@/lib/prisma";

import ProductHeader from "./components/header";

interface ProductPageProps {
  params: Promise<{ slug: string, productid: string }>;
}
const ProductPage = async({params}: ProductPageProps) => {
  const { slug, productid } = await params;
  const product = await db.product.findFirst({ where: { id: productid } });
  if(!product){
    return notFound();
  }
  
  return (
    <div>
      <ProductHeader product={product} />
      {slug} - {product.name}
    </div>
  )
}

export default ProductPage
