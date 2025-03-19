import Header from '@/components/layouts/Header'
import ProductCard from '@/components/products/ProductCard'
import { fetchProducts } from '@/services/api/products.api'
import { Suspense } from 'react'

export default async function Home() {
	const products = await fetchProducts()

	return (
		<Suspense>
			<div>
				<Header />

				<figure className="h-[400px] max-w-6xl mx-auto px-4">
					<img
						src="/paul-volkmer-updW-QUccFE-unsplash.jpg"
						className="h-full w-full object-cover rounded-xl"
						alt="banner"
					/>
				</figure>

				<div className="max-w-5xl mx-auto px-4">
					<div className="py-10">
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
							{products?.map((product) => (
								<ProductCard key={product.id} product={product} />
							))}
						</div>
					</div>
				</div>
			</div>
		</Suspense>
	)
}
