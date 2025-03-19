import { fetchProfile } from '../api/auth.api'
import { fetchOrder, fetchProductDetails, fetchProducts } from '../api/products.api'
import { useQuery } from '@tanstack/react-query'
import { fetchWishlist } from '../api/wishlist'

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

export function useWishlist() {
	return useQuery({
		queryKey: ['wishlist'],
		queryFn: () => fetchWishlist(),
	})
}

export function useUser() {
	const { data, isLoading } = useQuery({
		queryKey: ['profile'],
		queryFn: fetchProfile,
		retry: 1,
	})
	return {
		user: data,
		isLoading,
	}
}
