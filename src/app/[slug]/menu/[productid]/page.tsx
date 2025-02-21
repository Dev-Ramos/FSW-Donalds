import { notFound } from "next/navigation";

import { db } from "@/lib/prisma";

import ProductHeader from "./components/header";
import ProductDetails from "./components/product-details";

interface ProductPageProps {
  params: Promise<{ slug: string, productid: string }>;
}
const ProductPage = async({params}: ProductPageProps) => {
  const { slug, productid } = await params;
  const product = await db.product.findFirst({ where: { id: productid }, include: {
    restaurant: {
      select: {
        name: true,
        avatarImageUrl: true,
        slug: true
      }
    }
  } });
  if(!product){
    return notFound();
  }
  if(product.restaurant.slug !== slug){
    return notFound();
  }
  return (
    <div>
      <div className="flex h-screen flex-col">
        <ProductHeader product={product} />
        <ProductDetails product={product} />
      </div>
    </div>
  )
}

export default ProductPage
