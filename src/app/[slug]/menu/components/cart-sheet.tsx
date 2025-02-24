import React, { useContext, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet'
import { priceFormatter } from '@/helpers/currency'

import { CartContext } from '../context/cart'
import CartProductItem from './cart-product-item'
import FinishOrderDialog from './finish-order-dialog'

const CartSheet = () => {
  const [finishOrderDialogIsOpen, setFinishOrderDialogIsOpen] = useState<boolean>(false)
  const {isOpen, toggleCart, products, totalPrice} = useContext(CartContext)
  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}> 
      <SheetContent className='w-[85%]'>
        <SheetTitle>
          Sacola de pedidos
        </SheetTitle>
        <div className="flex flex-col h-[80%]">
          <div className="flex-auto py-5 space-y-3">
            {products.map(product => (
                <CartProductItem key={product.id} product={product}/>
              ))}
          </div>
        </div>
        <Card className='mb-6'>
          <CardContent className='p-5'>
            <div className="flex justify-between">
              <p className='text-sm text-muted-foreground'>Total</p>
              <p className="font-semibold text-sm">{priceFormatter(totalPrice)}</p>
            </div>
          </CardContent>
        </Card>
        <Button className="w-full rounded-xl" onClick={()=>setFinishOrderDialogIsOpen(true)}>Finalizar pedido</Button>
        <FinishOrderDialog open={finishOrderDialogIsOpen} onOpenChange={setFinishOrderDialogIsOpen} />
        
      </SheetContent>
    </Sheet>
  )
}

export default CartSheet
