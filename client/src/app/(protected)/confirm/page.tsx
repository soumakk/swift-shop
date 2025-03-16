import Header from '@/components/layouts/Header'
import { fetchFn } from '@/services/api'
import { cookies } from 'next/headers'
import { PageProps } from '../../../../.next/types/app/(protected)/confirm/page'
import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default async function ConfirmOrder({ searchParams }: PageProps) {
	const { orderId } = await searchParams
	const cookieStore = await cookies()
	const order = await fetchFn(`/orders/${orderId}`, 'GET', undefined, {
		Cookie: cookieStore.toString(),
	})

	console.log(order)
	return (
		<div>
			<Header minimal />

			<div className="max-w-5xl mx-auto px-4 py-10">
				<div className="flex flex-col gap-3 items-center">
					<div className="h-12 w-12 border-3 border-green-500 rounded-full grid place-content-center">
						<Check className="text-green-500 h-8 w-8" strokeWidth={2} />
					</div>
					<h2 className="text-slate-700 text-xl font-medium">
						Thank you. Your order has been placed
					</h2>
					<Button>Go to home</Button>
				</div>
			</div>
		</div>
	)
}
