import React, { useContext } from 'react'

import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet'

import { CartContext } from '../context/cart'
import CartProductItem from './cart-product-item'

const CartSheet = () => {
  const {isOpen, toggleCart, products} = useContext(CartContext)
  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}> 
      <SheetContent className='w-[85%]'>
        <SheetTitle>
          Sacola de pedidos
        </SheetTitle>
        <div className="py-5 space-y-3">
          {products.map(product => (
              <CartProductItem key={product.id} product={product}/>
            ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default CartSheet
