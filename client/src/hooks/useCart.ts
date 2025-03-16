import { ICartAddress, ICartItem } from '@/types/cart.types'
import type { IProduct, IProductVariant } from '@/types/products.types'
import { atom, useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { useMemo } from 'react'

const cartItemsAtom = atomWithStorage<ICartItem[]>('cart', [])
const cartAddressAtom = atom<ICartAddress | null>(null)

export function useCart() {
	const [cartItems, setCartItems] = useAtom(cartItemsAtom)
	const [cartAddress, setCartAddress] = useAtom(cartAddressAtom)

	const deliveryCharge = 40

	function addItemToCart(product: IProduct, variant: IProductVariant) {
		setCartItems((items) => {
			if (!items?.find((item) => item.variant.id === variant.id)) {
				return items?.concat([
					{
						product,
						variant,
						quantity: 1,
					},
				])
			}
			return items
		})
	}

	function isAlreadyPresent(variantId?: string) {
		return Boolean(cartItems?.find((item) => item?.variant?.id === variantId))
	}

	function removeItemFromCart(variantId: string) {
		setCartItems((items) => {
			return items?.filter((item) => item.variant.id !== variantId)
		})
	}

	function emptyCart() {
		setCartItems([])
		setCartAddress(null)
	}

	function saveCartAddress(address: ICartAddress) {
		return setCartAddress(address)
	}

	const subTotal = useMemo(() => {
		return cartItems?.reduce((total, item) => {
			total += item?.variant.price
			return total
		}, 0)
	}, [cartItems])

	const cartTotal = useMemo(() => {
		return subTotal + deliveryCharge
	}, [subTotal])

	return {
		addItemToCart,
		removeItemFromCart,
		cartItems,
		cartCount: cartItems?.length ?? 0,
		subTotal,
		cartTotal,
		deliveryCharge,
		cartAddress,
		saveCartAddress,
		emptyCart,
		isAlreadyPresent,
	}
}
