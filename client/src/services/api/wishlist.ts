import { fetchFn, IApiRes } from '.'

export async function fetchWishlist() {
	const res = await fetchFn<IApiRes<unknown>>(`/wishlist`, 'GET')
	return res?.data
}

export async function addWishlistItem(body: { variantId: string }) {
	const res = await fetchFn<IApiRes<unknown>>(`/wishlist`, 'POST', body)
	return res?.data
}

export async function deleteWishlistItem(params: { id: string }) {
	const res = await fetchFn<IApiRes<unknown>>(`/wishlist/${params.id}`, 'DELETE')
	return res?.data
}
