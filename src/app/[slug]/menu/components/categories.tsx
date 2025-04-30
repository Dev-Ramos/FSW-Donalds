"use client";
import { Prisma } from "@prisma/client";
import { ClockIcon } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import { useContext, useState } from "react";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { priceFormatter } from "@/helpers/currency";

import { CartContext } from "../context/cart";
import CartSheet from "./cart-sheet";
import ProductList from "./products-list";

interface RestaurantCategoriesProps {
  restaurant: Prisma.RestaurantGetPayload<{
    include: { menuCategories: { include: { products: true } } };
  }>;
}

type MenuCategoryWithProducts = Prisma.MenuCategoryGetPayload<{
  include: { products: true };
}>;

const RestaurantCategories = ({ restaurant }: RestaurantCategoriesProps) => {
  const { totalItems, totalPrice, toggleCart } = useContext(CartContext);
  const [selectedCategory, setSelectedCategory] =
    useState<MenuCategoryWithProducts>(restaurant.menuCategories[0]);
  const handleCategoryClick = (category: MenuCategoryWithProducts) => {
    setSelectedCategory(category);
  };
  const getCategoryButtonVariant = (category: MenuCategoryWithProducts) => {
    return selectedCategory.id === category.id ? "default" : "secondary";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", bounce: 0.3, duration: 1 }}
      className="relative z-50 mt-[-1.5rem] rounded-t-3xl bg-white">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1}}
        className="p-5">
        <div className="flex items-center gap-3">
          <Image
            src={restaurant.avatarImageUrl}
            alt={restaurant.name}
            width={45}
            height={45}
          />
          <div>
            <h2 className="text-lg font-semibold">{restaurant.name}</h2>
            <p className="text-xs opacity-55">{restaurant.description}</p>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-1 text-xs text-green-500">
          <ClockIcon size={12} />
          <p>Aberto!</p>
        </div>
      </motion.div>

      <ScrollArea className="w-full -mt-4">
        <motion.div
          animate={{ opacity: [0, 1], x: [200, 0] }}
          transition={{ type: 'spring', bounce: 0.5, duration: 1, delay: 0.3}}
          className="flex w-max space-x-4 p-4">
          {restaurant.menuCategories.map((category) => (
            <motion.div
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.95 }}
              key={category.id}>
              <Button
                key={category.id}
                variant={getCategoryButtonVariant(category)}
                size="sm"
                className="rounded-full"
                onClick={() => handleCategoryClick(category)}
              >
                {category.name}
              </Button>
            </motion.div>
          ))}
        </motion.div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <motion.h3
        key={selectedCategory.name}
        animate={{ opacity: [0, 1], y: [10, 0] }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="px-5 pt-2 font-semibold">
        {selectedCategory.name}
      </motion.h3>
      <ProductList products={selectedCategory.products} />
      {totalItems > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed bottom-0 left-0 right-0 flex w-full items-center justify-between bg-white px-5 py-3">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Total dos pedidos</p>
            <p className="text-sm font-semibold">
              {priceFormatter(totalPrice)}
              <span className="text-xs font-normal text-muted-foreground">
                / {totalItems} {totalItems > 1 ? "itens" : "item"}
              </span>
            </p>
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button onClick={toggleCart}>Ver sacola</Button>
          </motion.div>
          <CartSheet />
        </motion.div>
      )}
    </motion.div>
  );
};

export default RestaurantCategories;
