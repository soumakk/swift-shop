import { IProduct } from '@/types/products.types'
import { fetchFn, IApiRes } from '.'

export async function fetchProducts(params?: { categoryId?: string }) {
	const query = new URLSearchParams()
	if (params?.categoryId) {
		query.append('categoryId', params.categoryId)
	}
	const res = await fetchFn<IApiRes<IProduct[]>>(`/products?${query.toString()}`, 'GET')
	return res?.data
}

export async function fetchProductDetails(params: { productId?: string }) {
	const res = await fetchFn<IApiRes<IProduct>>(`/products/${params?.productId}`, 'GET')
	return res?.data
}

export async function fetchOrder(orderId: string) {
	const res = await fetchFn<IApiRes<unknown>>(`/orders/${orderId}`, 'GET')
	return res?.data
}
