'use client'
import { Button } from '@/components/ui/button'
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel'
import { useCart } from '@/hooks/useCart'
import LoveIcon from '@/icons/LoveIcon'
import { formatCurrency } from '@/lib/utils'
import { useProductDetails } from '@/services/query/products.query'
import Link from 'next/link'
import { useParams, useSearchParams } from 'next/navigation'
import React from 'react'

export default function ProductDetails() {
	const params = useParams()
	const searchParams = useSearchParams()

	const variantId = searchParams.get('variantId') as string
	const productId = params?.productId as string

	const { data: product, isLoading: isProductLoading } = useProductDetails(productId)
	const { addItemToCart } = useCart()

	const selectedVariantId = variantId ?? product?.variants[0]?.id
	const selectedVariant = product?.variants?.find((v) => v.id === selectedVariantId)

	return (
		<div>
			{isProductLoading || !product ? (
				<p>Loading...</p>
			) : (
				<div className="max-w-5xl mx-auto px-4">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-16 py-10">
						<Carousel>
							<CarouselContent>
								{selectedVariant?.images?.map((image) => (
									<CarouselItem key={image}>
										<img src={image} alt="product" />
									</CarouselItem>
								))}
							</CarouselContent>
							<CarouselPrevious />
							<CarouselNext />
						</Carousel>

						<div className="md:pl-10">
							<h2 className="text-2xl font-semibold">{product?.name}</h2>
							{/* <p>{selectedVariant?.sku}</p> */}

							{selectedVariant?.price ? (
								<h4 className="text-3xl font-semibold py-4">
									{formatCurrency(selectedVariant.price)}
								</h4>
							) : null}

							<p>{product?.description}</p>

							<div className="flex items-center gap-2 my-10">
								{product?.variants?.map((variant) => (
									<Link
										key={variant.id}
										href={`/${product.id}?variantId=${variant.id}`}
									>
										<img
											src={variant?.images?.[0]}
											alt={variant.color}
											className="h-20 w-20 object-cover"
										/>
									</Link>
								))}
							</div>

							<div className="flex gap-2 mt-8">
								<Button
									className="w-full"
									size="lg"
									onClick={() => addItemToCart(product, selectedVariant!)}
								>
									Add to cart
								</Button>

								<Button variant="ghost" size="lg" className="px-4">
									<LoveIcon />
								</Button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}
