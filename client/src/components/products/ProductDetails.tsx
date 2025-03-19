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
import { cn, formatCurrency } from '@/lib/utils'
import { useAddWishlistItem } from '@/services/query/mutations'
import { IProduct } from '@/types/products.types'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import toast from 'react-hot-toast'
import { IconButton } from '../ui/IconButton'
import { Tooltip } from '../ui/tooltip'

export default function ProductDetails({ product }: { product: IProduct }) {
	const searchParams = useSearchParams()
	const variantId = searchParams.get('variantId') as string
	const { addItemToCart, isAlreadyPresent } = useCart()
	const { mutate: addItemToWishlist, isPending } = useAddWishlistItem()

	const selectedVariantId = variantId ?? product?.variants[0]?.id
	const selectedVariant = product?.variants?.find((v) => v.id === selectedVariantId)

	function handleAddToWishlist() {
		addItemToWishlist(
			{ variantId: selectedVariantId },
			{
				onSuccess: () => {
					toast.success('One item added to wishlist')
				},
			}
		)
	}

	return (
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

					<div className="my-10">
						<p className="uppercase text-xs text-muted-foreground mb-3 font-semibold">
							Colors
						</p>
						<div className="flex items-center gap-3">
							{product?.variants?.map((variant) => (
								<Link
									key={variant.id}
									href={`/${product.id}?variantId=${variant.id}`}
								>
									<Tooltip content={variant?.color}>
										<img
											src={variant?.images?.[0]}
											alt={variant.color}
											className={cn(
												'h-20 w-20 object-cover smooth-cover-fit cursor-pointer rounded-lg',
												{
													ring: selectedVariantId === variant.id,
												}
											)}
										/>
									</Tooltip>
								</Link>
							))}
						</div>
					</div>

					<div className="flex gap-2 mt-8">
						<Button
							className="w-full"
							size="lg"
							onClick={() => {
								if (isAlreadyPresent(selectedVariant?.id)) {
									toast.success('Already present in the card')
								} else {
									addItemToCart(product, selectedVariant!)
									toast.success(`${product.name} added to the card`)
								}
							}}
						>
							Add to cart
						</Button>

						<IconButton onClick={handleAddToWishlist}>
							{isPending ? (
								<Loader2 className="h-4 w-4 animate-spin" />
							) : (
								<LoveIcon size={20} />
							)}
						</IconButton>
					</div>
				</div>
			</div>
		</div>
	)
}
