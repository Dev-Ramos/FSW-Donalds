import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import { useContext } from "react";

import { Button } from "@/components/ui/button";
import { priceFormatter } from "@/helpers/currency";

import { CartContext, CartProduct } from "../context/cart";

interface CartProductItemProps {
  product: CartProduct;
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
    },
  },
};

const CartProductItem = ({ product }: CartProductItemProps) => {
  const { changeQuantityCartProduct, removeItemFromCart } =
    useContext(CartContext);
  return (
    <motion.div
      variants={item}
      initial="hidden"
      animate="show"
      className="flex items-center justify-between border-b pb-4"
    >
      <div className="flex items-center gap-2">
        <div className="relative h-20 w-20">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-contain"
          />
        </div>
        <div className="space-y-1">
          <div className="w-[90%]">
            <p
              className="truncate text-ellipsis font-medium"
              title={product.name}
            >
              {product.name}
            </p>
          </div>
          <p className="font-semibold">{priceFormatter(product.price)}</p>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              className="h-7 w-7 rounded-lg"
              onClick={() => changeQuantityCartProduct(product.id, "decrease")}
              disabled={product.quantity === 1}
            >
              <ChevronLeftIcon size={16} />
            </Button>
            <p className="w-7 text-center">{product.quantity}</p>
            <Button
              variant="destructive"
              className="h-7 w-7 rounded-lg"
              onClick={() => changeQuantityCartProduct(product.id, "increase")}
            >
              <ChevronRightIcon size={16} />
            </Button>
          </div>
        </div>
      </div>
      <Button
        variant="outline"
        className="h-8 w-8 rounded-lg"
        onClick={() => removeItemFromCart(product.id)}
      >
        <TrashIcon size={16} />
      </Button>
    </motion.div>
  );
};

export default CartProductItem;
