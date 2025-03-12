import Header from '@/components/layouts/Header'
import ProductDetails from '@/components/products/ProductDetails'
import { Suspense } from 'react'

export default function ProductDetailsPage() {
	return (
		<Suspense>
			<div>
				<Header />
				<ProductDetails />
			</div>
		</Suspense>
	)
}
