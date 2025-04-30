"use client";
import { Product } from "@prisma/client";
import { motion } from "framer-motion";
import Image from "next/image";

import HeaderButtons from "../../components/header-buttons";

interface ProductHeaderProps {
  product: Pick<Product, "name" | "imageUrl">;
}

const ProductHeader = ({ product }: ProductHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative min-h-[300px] w-full">
      <Image
        src={product.imageUrl}
        alt={product.name}
        fill
        className="object-contain"
      />
      <HeaderButtons/>
      {/* <Button
        variant="secondary"
        size="icon"
        className="absolute left-4 top-4 z-50 rounded-full"
        onClick={handleBackClick}
      >
        <ChevronLeftIcon />
      </Button>
      <Button
        variant="secondary"
        size="icon"
        className="absolute right-4 top-4 z-50 rounded-full"
        onClick={() => router.push("/fws-donalds/orders")}
      >
        <ShoppingBagIcon />
      </Button> */}
    </motion.div>
  );
};

export default ProductHeader;
