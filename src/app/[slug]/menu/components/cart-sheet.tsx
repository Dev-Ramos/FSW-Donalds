import React, { useContext } from 'react'

import { Sheet, SheetContent, SheetHeader } from '@/components/ui/sheet'

import { CartContext } from '../context/cart'

const CartSheet = () => {
  const {isOpen, toggleCart, products} = useContext(CartContext)
  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}> 
      <SheetContent>
        <SheetHeader>
          Sacola de pedidos
        </SheetHeader>
        {products.map(product => (
          <p key={product.id}>{product.name} - {product.quantity} </p>
        ))}
      </SheetContent>
    </Sheet>
  )
}

export default CartSheet
