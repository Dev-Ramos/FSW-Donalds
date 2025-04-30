import { Product } from "@prisma/client";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
// import { useParams } from 'next/navigation'
import React from "react";

import { priceFormatter } from "@/helpers/currency";

interface ProductListProps {
  products: Product[];
}

const container = {
  show: {
    x: 0,
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.5,
    }
  }, 
  hidden: {
    x: -20,
    opacity: 0
  }
}
const item = {
  hidden: { opacity: 0, x: -20 },
  show: {
    opacity: 1,
    x: 0, 
    transition: {
      type: "spring",
      bounce: 0.3,
      duration: 1,
    }
  }
};

// Esse componente também é use client por que está sendo renderizado dentro de um use client
const ProductList = ({ products }: ProductListProps) => {
  // const { slug } = useParams<{slug: string}>()
  const searchParams = useSearchParams();
  const consumptionMethod = searchParams.get("consumptionMethod");
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate='show'
      key={products[0].id} // A key faz com que o React entenda que os items mudaram e recria a animação
      className="space-y-3 px-5 pb-8">
      {products.map((product) => (
        <motion.div
          variants={item}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale:0.98}}
          key={product.id}>
          <Link
            key={product.id}
            href={`menu/${product.id}?consumptionMethod=${consumptionMethod}`}
            className="flex items-center justify-between gap-10 border-b py-3"
            title={`${product.name} - ${priceFormatter(product.price)}`}
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
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ProductList;
