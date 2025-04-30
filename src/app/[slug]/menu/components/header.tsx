"use client";
import { Restaurant } from "@prisma/client";
import { motion } from "motion/react";
import Image from "next/image";

import HeaderButtons from "./header-buttons";

interface RestaurantHeaderProps {
  restaurant: Pick<Restaurant, "coverImageUrl" | "name">;
}

export const RestaurantHeader = ({ restaurant }: RestaurantHeaderProps) => {

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="relative h-[250px] w-full"
    >
      <Image
        src={restaurant.coverImageUrl}
        alt={restaurant.name}
        fill
        className="object-cover"
      />
      <HeaderButtons />
    </motion.div>
  );
};
