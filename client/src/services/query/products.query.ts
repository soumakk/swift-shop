import { fetchOrder, fetchProductDetails, fetchProducts } from '../api/products.api'
import { useQuery } from '@tanstack/react-query'

export function useProductsByCategory(categoryId?: string) {
	return useQuery({
		queryKey: [categoryId, 'products'],
		queryFn: () => fetchProducts({ categoryId }),
	})
}

export function useProductDetails(productId?: string) {
	return useQuery({
		queryKey: ['products', productId],
		queryFn: () => fetchProductDetails({ productId }),
	})
}

export function useOrder(orderId: string) {
	return useQuery({
		queryKey: ['orders', orderId],
		queryFn: () => fetchOrder(orderId),
		enabled: !!orderId,
	})
}
