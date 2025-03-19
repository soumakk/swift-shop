import { useMutation } from '@tanstack/react-query'
import { addWishlistItem } from '../api/wishlist'

export function useAddWishlistItem() {
	return useMutation({
		mutationFn: (body: { variantId: string }) => addWishlistItem(body),
	})
}
