import { Product } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
// import { useParams } from 'next/navigation'
import React from 'react'

interface ProductListProps {
  products: Product[],
}
// Esse componente também é use client por que está sendo renderizado dentro de um use client
const ProductList = ({products}: ProductListProps) => {
  // const { slug } = useParams<{slug: string}>()
  return (
    <div className='space-y-3 py-3 px-5'>
      {products.map(product => (
        <Link key={product.id} href={`menu/${product.id}`} className='flex items-center justify-between gap-10 py-3 border-b'>
          <div>
            <h3 className='text-sm font-medium'>{product.name}</h3>
            <p className='line-clamp-2 text-sm text-muted-foreground'>{product.description}</p>
            <p className="pt-3 font-semibold text-sm">{new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(product.price)}</p>
          </div>
          <div className="relative min-h-[82px] min-w-[120px]">
            <Image src={product.imageUrl} alt={product.name} fill className='rounded-lg object-contain'/>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default ProductList
