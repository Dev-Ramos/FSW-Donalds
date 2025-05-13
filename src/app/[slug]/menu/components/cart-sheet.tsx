import { AnimatePresence, motion } from "framer-motion";
import { useContext, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { priceFormatter } from "@/helpers/currency";

import { CartContext } from "../context/cart";
import CartProductItem from "./cart-product-item";
import FinishOrderDialog from "./finish-order-dialog";

const container = {
  hidden: { opacity: 0 }, 
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 1
    }
  }
}


const CartSheet = () => {
  const [finishOrderDialogIsOpen, setFinishOrderDialogIsOpen] =
    useState<boolean>(false);
  const { isOpen, toggleCart, products, totalPrice } = useContext(CartContext);
  
  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent className="w-[90%] p-3">
        <motion.div
          animate={{ opacity: [0, 1], y: [20, 0] }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <SheetTitle>Sacola de pedidos</SheetTitle>
        </motion.div>
        <AnimatePresence mode="wait">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex h-[80%] w-full flex-col">
            <div className="flex-auto space-y-3 py-5">
              {products.map((product) => (
                <CartProductItem key={product.id} product={product} />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
        <motion.div
          animate={{ opacity: [0, 1], y: [20, 0] }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <Card className="mb-6">
            <CardContent className="p-5">
              <div className="flex justify-between">
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-sm font-semibold">
                  {priceFormatter(totalPrice)}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          animate={{ scale: [ 0.97, 1, 0.97] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="w-full"
        >
          <Button
            className="w-full rounded-xl"
            onClick={() => setFinishOrderDialogIsOpen(true)}
          >
            Finalizar pedido
          </Button>
        </motion.div>
        <FinishOrderDialog
          open={finishOrderDialogIsOpen}
          onOpenChange={setFinishOrderDialogIsOpen}
        />
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
