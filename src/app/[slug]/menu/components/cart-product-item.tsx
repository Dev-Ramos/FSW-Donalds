import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useContext } from "react";

import { Button } from "@/components/ui/button";
import { priceFormatter } from "@/helpers/currency";

import { CartContext, CartProduct } from "../context/cart";

interface CartProductItemProps {
  product: CartProduct;
}

const CartProductItem = ({ product }: CartProductItemProps) => {
  const { changeQuantityCartProduct, removeItemFromCart } =
    useContext(CartContext);
  return (
    <div className="w-contain flex items-center justify-around border-b pb-4">
      <div className="flex w-[90%] items-center gap-2">
        <div className="relative h-20 w-20">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-contain"
          />
        </div>
        <div className="space-y-1">
          <div className="w-[85%]">
            <p
              className="truncate text-ellipsis font-medium"
              title={product.name}
            >
              {product.name}
            </p>
          </div>
          <p className="font-semibold">{priceFormatter(product.price)}</p>
          {/* Animate here */}
          <div className="flex items-center gap-1">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                variant="outline"
                className="h-7 w-7 rounded-lg"
                onClick={() =>
                  changeQuantityCartProduct(product.id, "decrease")
                }
                disabled={product.quantity === 1}
              >
                <ChevronLeftIcon size={16} />
              </Button>
            </motion.div>
            <AnimatePresence mode="wait">
              <motion.p
                key={product.quantity}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.1 }}
                className="w-4"
              >
                {product.quantity}
              </motion.p>
            </AnimatePresence>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                variant="destructive"
                className="h-7 w-7 rounded-lg"
                onClick={() =>
                  changeQuantityCartProduct(product.id, "increase")
                }
              >
                <ChevronRightIcon size={16} />
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
      >
        <Button
          variant="outline"
          className="h-8 w-8 rounded-lg"
          onClick={() => removeItemFromCart(product.id)}
        >
          <TrashIcon size={16} />
        </Button>
      </motion.div>
    </div>
  );
};

export default CartProductItem;
