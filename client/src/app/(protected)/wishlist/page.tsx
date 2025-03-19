import Header from '@/components/layouts/Header'
import { fetchFn, IApiRes } from '@/services/api'
import { fetchWishlist } from '@/services/api/wishlist'
import { useWishlist } from '@/services/query/query'
import { cookies } from 'next/headers'
import React from 'react'

export default async function WishlistPage() {
	const cookieStore = await cookies()
	const wishlist = await fetchFn<IApiRes<unknown>>(`/wishlist`, 'GET', undefined, {
		Cookie: cookieStore.toString(),
	})
	console.log(wishlist)
	return (
		<div>
			<Header />
		</div>
	)
}
