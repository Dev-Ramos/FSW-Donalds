"use client";
import { Restaurant } from "@prisma/client";
import { ChevronLeftIcon, ShoppingBagIcon } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

interface RestaurantHeaderProps {
  restaurant: Pick<Restaurant, "coverImageUrl" | "name">;
}

export const RestaurantHeader = ({ restaurant }: RestaurantHeaderProps) => {
  const router = useRouter();
  const handleBackClick = () => router.push("/fsw-donalds");

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
      <motion.div
        animate={{ opacity: [0, 1] }}
        transition={{ delay: 0.3, duration: 0.5 }}
        whileHover={{ x: -5 }}
      >
        <Button
          variant="secondary"
          size="icon"
          className="absolute left-4 top-4 z-50 rounded-full"
          onClick={handleBackClick}
        >
          <ChevronLeftIcon />
        </Button>
      </motion.div>
      <motion.div
        animate={{ opacity: [0, 1] }}
        transition={{ delay: 0.3, duration: 0.5 }}
        whileHover={{ x: 5 }}
      >
        <Button
          variant="secondary"
          size="icon"
          className="absolute right-4 top-4 z-50 rounded-full"
          onClick={() => router.push("/fws-donalds/orders")}
        >
          <ShoppingBagIcon />
        </Button>
      </motion.div>
    </motion.div>
  );
};
