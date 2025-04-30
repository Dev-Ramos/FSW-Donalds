"use client";
import { Prisma } from "@prisma/client";
import { ChefHatIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useContext, useState } from "react";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { priceFormatter } from "@/helpers/currency";

import CartSheet from "../../components/cart-sheet";
import { CartContext } from "../../context/cart";

interface ProductDetailsProps {
  product: Prisma.ProductGetPayload<{
    include: { restaurant: { select: { name: true; avatarImageUrl: true } } };
  }>;
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
  const { toggleCart, addProduct } = useContext(CartContext);
  const [quantity, setQuantity] = useState<number>(1);
  const handleQuantityChange = (option: string) => {
    if (option === "decrease") {
      setQuantity((prev) => prev - 1);
    } else if (option === "increase") {
      setQuantity((prev) => prev + 1);
    }
  };
  const handleAddToCart = () => {
    addProduct({
      ...product,
      quantity,
    });
    toggleCart();
  };

  return (
    <>
      <div className="relative z-50 mt-[-1.5rem] flex flex-auto flex-col overflow-hidden rounded-t-3xl p-5">
        <div className="flex-auto overflow-hidden">
          {/* Logo and restaurant name */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", bounce: 0.3, duration: 0.8 }}
            className="flex gap-1.5">
            <Image
              src={product.restaurant.avatarImageUrl}
              alt={product.restaurant.name}
              width={16}
              height={16}
              className="rounded-full"
            />
            <p className="text-xs text-muted-foreground">
              {product.restaurant.name}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Product name */}
            <h2 className="mt-1 text-xl font-semibold">{product.name}</h2>
            {/* Price and quantity of products */}
            <div className="mt-3 flex items-center justify-between">
              <h3 className="text-xl font-semibold">
                {priceFormatter(product.price)}
              </h3>
              <div className="flex items-center gap-3 text-center">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                  variant="outline"
                  className="h-8 w-8 rounded-xl"
                  onClick={() => handleQuantityChange("decrease")}
                  disabled={quantity === 1}
                  >
                    <ChevronLeftIcon />
                  </Button>
                </motion.div>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={quantity}
                    initial={{ scale: 0}}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ duration: 0.1 }}
                    className="w-4">
                    {quantity}
                  </motion.p>
                </AnimatePresence>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                  variant="destructive"
                  className="h-8 w-8 rounded-xl"
                  onClick={() => handleQuantityChange("increase")}
                  >
                    <ChevronRightIcon />
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
          <ScrollArea className="h-[64.5%] mt-2">
            <motion.div
              animate={{ opacity: [0, 1], y: [20, 0] }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {/* About product */}
              <div className="mt-4 space-y-3">
                <h4 className="font-semibold">Sobre</h4>
                <p className="text-sm text-muted-foreground">
                  {product.description}
                </p>
              </div>
              {/* Ingerdients */}
              <div className="mt-6 space-y-3">
                <div className="5 flex items-center gap-1">
                  <ChefHatIcon size={18} />
                  <h4 className="font-semibold">Ingredientes</h4>
                </div>
                <ul className="list-disc px-5">
                  {product.ingredients.map((ingredient, index) => (
                    <li key={index} className="text-sm text-muted-foreground">
                      {ingredient}
                    </li>
                  ))}
                </ul>
              </div>
              <ScrollBar orientation="vertical" />
            </motion.div>
          </ScrollArea>
          <div className="absolute bottom-0 left-0 right-0 flex h-16 items-center justify-center bg-white p-5">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full"
            >
              <Button
                variant="default"
                className="w-full rounded-full"
                onClick={handleAddToCart}
              >
                Adicionar à sacola
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
      <CartSheet />
    </>
  );
};

export default ProductDetails;
