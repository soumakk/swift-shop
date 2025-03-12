import Header from '@/components/layouts/Header'
import ProductsList from '@/components/products/ProductsList'
import { Suspense } from 'react'

export default function Home() {
	return (
		<Suspense>
			<div>
				<Header />

				<ProductsList />
			</div>
		</Suspense>
	)
}
