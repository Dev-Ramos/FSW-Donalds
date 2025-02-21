import React, { useContext } from 'react'

import { Sheet, SheetContent, SheetDescription, SheetHeader } from '@/components/ui/sheet'

import { CartContext } from '../context/cart'

const CartSheet = () => {
  const {isOpen, toggleCart} = useContext(CartContext)
  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}> 
      <SheetContent>
        <SheetHeader>
          Sacola de pedidos
        </SheetHeader>
        <SheetDescription>
          sakfalkjçldgf sdlkgaldkfgj klsjdglkjdagl lksdjglkaj 
        </SheetDescription>
      </SheetContent>
    </Sheet>
  )
}

export default CartSheet
