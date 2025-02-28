'use client'
import { OrderStatus, Prisma } from '@prisma/client'
import { ChevronLeftIcon, ScrollTextIcon } from 'lucide-react'
import Image from 'next/image'
import { redirect } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { priceFormatter } from '@/helpers/currency'

interface OrderListProps{
  orders: Prisma.OrderGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true,
          avatarImageUrl: true,
        }
      },
      orderProducts: {
        include: {
          product:true
        }
      }
    }
  }>[]
}

const getOrderStatusLabel = (status: OrderStatus) => {
  if (status === 'FINISHED') return 'Finalizado'
  if (status === 'IN_PREPARATION') return 'Em Preparo'
  if (status === 'PENDING') return 'Pendente'
  return ""
  }

const OrderList = ({ orders }: OrderListProps) => {
  
  return (
    <div className='space-y-6 p-6'>
      <Button variant='secondary' size='icon' className='rounded-full'
      onClick={()=>redirect(`/fsw-donalds/menu?consumptionMethod=${orders[0].consumptionMethod}`)}>
        <ChevronLeftIcon/>
      </Button>
      <div className="flex items-center gap-3">
        <ScrollTextIcon />
        <h2 className="font-semibold text-lg">Meus Pedidos</h2>
      </div>
      <div>
        {orders.map((order) => (
          <Card key={order.id}>
            <CardContent className='space-y-4 p-5'>
              <div className={`w-fit rounded-full text-white px-2 py-1 text-xs font-semibold ${
                order.status === OrderStatus.FINISHED ? 'bg-green-500' : 'bg-gray-200 text-gray-500'
              }`}>
                {getOrderStatusLabel(order.status)}
              </div>
              <div className="flex items-center gap-2">
                <div className="relative h-5 w-5">
                  <Image src={order.restaurant.avatarImageUrl}
                    alt={order.restaurant.name}
                    fill
                    className='object-contain rounded-sm'
                  />
                </div>
                <p className="text-sm font-semibold">{order.restaurant.name}</p>
              </div>
              <Separator />
              {order.orderProducts.map((orderProduct) => (
                <div className='flex items-center gap-2' key={orderProduct.id}>
                  <div className="h-5 w-5 flex items-center justify-center rounded-full text-white bg-gray-400 text-xs font-semibold">
                    {orderProduct.quantity}
                  </div>
                  <p className='text-sm'>{ orderProduct.product.name }</p>
                </div>
              ))}
              <Separator />
              <p className="text-sm font-medium">{ priceFormatter(order.total) }</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default OrderList
