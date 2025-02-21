'use client'
import { Prisma } from "@prisma/client"
import { ChefHatIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { priceFormatter } from "@/helpers/currency"

interface ProductDetailsProps {
  product: Prisma.ProductGetPayload<{ include: { restaurant: { select: { name: true, avatarImageUrl: true } } } }>
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
  const [quantity, setQuantity] = useState<number>(1)
  const handleQuantityChange = (option: string) => {
    if(option === 'decrease'){
      setQuantity(prev => prev - 1)
    }else if(option === 'increase'){
      setQuantity(prev => prev + 1)
    }
  }
  return (
    <div className="relative z-50 mt-[-1.5rem] flex flex-auto flex-col overflow-hidden rounded-t-3xl p-5">
      <div className="flex-auto overflow-hidden">
        {/* Logo and restaurant name */}
        <div className="flex gap-1.5">
          <Image src={product.restaurant.avatarImageUrl} alt={product.restaurant.name} width={16} height={16} className="rounded-full"/>
          <p className="text-xs text-muted-foreground">{product.restaurant.name}</p>
        </div>
        {/* Product name */}
        <h2 className="text-xl font-semibold mt-1">{product.name}</h2>
        {/* Price and quantity of products */}
        <div className="flex items-center justify-between mt-3">
          <h3 className="text-xl font-semibold">
            {priceFormatter(product.price)}
          </h3>
          <div className="flex items-center text-center gap-3">
            <Button variant='outline' className="rounded-xl w-8 h-8" onClick={()=>handleQuantityChange('decrease')} 
              disabled={quantity === 1}>
              <ChevronLeftIcon/>
            </Button>
            <p className="w-4">{quantity}</p>
            <Button variant='destructive' className="rounded-xl w-8 h-8" onClick={()=>handleQuantityChange('increase')}>
              <ChevronRightIcon/>
            </Button>
          </div>
        </div>
        <ScrollArea className="h-[65%] mb-5">
          {/* About product */}
          <div className="mt-6 space-y-3">
            <h4 className="font-semibold">Sobre</h4>
            <p className="text-muted-foreground text-sm">{product.description}</p>
          </div>
          {/* Ingerdients */}
          <div className="mt-6 space-y-3">
            <div className="flex items-center gap-1 5">
              <ChefHatIcon size={18}/>
              <h4 className="font-semibold">Ingredientes</h4>
            </div>
            <ul className="list-disc px-5">
              {product.ingredients.map((ingredient, index) => (
                <li key={index} className="text-muted-foreground text-sm">{ingredient}</li>
              ))}
            </ul>
          </div>
          <ScrollBar orientation='vertical'/>
        </ScrollArea>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-white p-5 flex items-center justify-center">
          <Button variant='default' className="w-full rounded-full">
            Adicionar à sacola
          </Button>
        </div>
      </div>

    </div>
  )
}

export default ProductDetails
