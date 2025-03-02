'use client'

import { useProductsByCategory } from '@/services/query/products.query'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import ProductCard from './ProductCard'

export default function ProductsList() {
	const searchParams = useSearchParams()
	const categoryId = searchParams.get('categoryId') as string

	const { data: products } = useProductsByCategory(categoryId)

	return (
		<div className="max-w-5xl mx-auto px-4">
			<div className="py-10">
				<h1 className="mb-10 text-2xl font-semibold">
					{products?.[0]?.category?.name} Collection
				</h1>

				<div className="grid grid-cols-3 gap-8">
					{products?.map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
				</div>
			</div>
		</div>
	)
}
