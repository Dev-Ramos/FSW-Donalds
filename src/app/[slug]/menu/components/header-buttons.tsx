import { ChevronLeftIcon, ShoppingBagIcon } from "lucide-react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

const HeaderButtons = () => {
  const router = useRouter();
  const handleBackClick = () => router.back();
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration:0.4, delay: 0.3}}
    >
      <motion.div
        whileHover={{ x: -3 }}
        whileTap={{ scale: 0.98}}
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
        whileHover={{ y: 3 }}
        whileTap={{ scale: 0.98}}
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

export default HeaderButtons;
