import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react"
import Image from "next/image"
import { useContext } from "react"

import { Button } from "@/components/ui/button"
import { priceFormatter } from "@/helpers/currency"

import { CartContext, CartProduct } from "../context/cart"

interface CartProductItemProps {
  product: CartProduct
}

const CartProductItem = ({ product }: CartProductItemProps) => {
  const { changeQuantityCartProduct } = useContext(CartContext)
  return (
    <div className="flex justify-between items-center border-b pb-4">
      <div className="flex items-center gap-2">
        <div className="relative h-20 w-20">
          <Image src={product.imageUrl} alt={product.name} fill className="object-contain"/>
        </div>
        <div className="space-y-1">
          <div className="w-[90%]">
            <p className="font-medium truncate text-ellipsis" title={product.name}>{product.name}</p>
          </div>
          <p className="font-semibold">{priceFormatter(product.price)}</p>
          <div className="flex items-center gap-1">
            <Button variant='outline' className="rounded-lg w-7 h-7"
            onClick={()=>changeQuantityCartProduct(product.id, 'decrease')}
            disabled={product.quantity === 1}>
              <ChevronLeftIcon size={16} />
            </Button>
            <p className="w-7 text-center">{product.quantity}</p>
            <Button variant='destructive' className="rounded-lg w-7 h-7"
            onClick={()=>changeQuantityCartProduct(product.id, 'increase')}>
              <ChevronRightIcon size={16} />
            </Button>
          </div>
        </div>
      </div>
      <Button variant='outline' className="rounded-lg w-8 h-8">
        <TrashIcon size={16} />  
      </Button>
    </div>
  )
}

export default CartProductItem
