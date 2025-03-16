import { formatCurrency } from '@/lib/utils'
import { IProduct } from '@/types/products.types'
import Link from 'next/link'

export default function ProductCard({ product }: { product: IProduct }) {
	const defaultVariant = product?.variants[0]
	return (
		<div>
			<Link href={`/${product.id}?variantId=${defaultVariant?.id}`}>
				<figure className="h-80 overflow-hidden">
					<img
						src={defaultVariant?.images?.[0]}
						className="h-full w-full object-cover smooth-cover-fit"
						alt="shoe"
					/>
				</figure>

				<div className="mt-3">
					<div className="flex items-center justify-between">
						<p className="font-medium">{product?.name}</p>
						<p className="font-semibold">{formatCurrency(defaultVariant.price)}</p>
					</div>
					<p className="text-sm text-gray-500">{product?.category?.name}</p>
				</div>
			</Link>
		</div>
	)
}
