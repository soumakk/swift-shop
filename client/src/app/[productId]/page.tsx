import Header from '@/components/layouts/Header'
import ProductDetails from '@/components/products/ProductDetails'
import { fetchProductDetails } from '@/services/api/products.api'
import { Suspense } from 'react'
import { PageProps } from '../../../.next/types/app/[productId]/page'

export default async function ProductDetailsPage({ params }: PageProps) {
	const { productId } = await params
	const product = await fetchProductDetails({ productId })

	return (
		<Suspense>
			<div>
				<Header />
				{product ? <ProductDetails product={product} /> : null}
			</div>
		</Suspense>
	)
}
