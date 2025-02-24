import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
// import { useParams } from 'next/navigation'
import React from "react";

import { priceFormatter } from "@/helpers/currency";

interface ProductListProps {
  products: Product[];
}
// Esse componente também é use client por que está sendo renderizado dentro de um use client
const ProductList = ({ products }: ProductListProps) => {
  // const { slug } = useParams<{slug: string}>()
  const searchParams = useSearchParams();
  const consumptionMethod = searchParams.get('consumptionMethod')
  return (
    <div className="space-y-3 px-5 py-3">
      {products.map((product) => (
        <Link
          key={product.id}
          href={`menu/${product.id}?consumptionMethod=${consumptionMethod}`}
          className="flex items-center justify-between gap-10 border-b py-3"
        >
          <div>
            <h3 className="text-sm font-medium">{product.name}</h3>
            <p className="line-clamp-2 text-sm text-muted-foreground">
              {product.description}
            </p>
            <p className="pt-3 text-sm font-semibold">
              {priceFormatter(product.price)}
            </p>
          </div>
          <div className="relative min-h-[82px] min-w-[120px]">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="rounded-lg object-contain"
            />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductList;
