import { useCart } from '@/hooks/useCart'
import { Drawer, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle } from '../ui/drawer'
import { formatCurrency } from '@/lib/utils'
import Link from 'next/link'
import { Button } from '../ui/button'

export default function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
	const { cartItems, subTotal, cartCount, removeItemFromCart } = useCart()

	return (
		<Drawer open={open} onOpenChange={onClose} direction="right">
			<DrawerContent className="w-[500px]">
				<DrawerHeader>
					<DrawerTitle>Shopping Bag ({cartCount})</DrawerTitle>
				</DrawerHeader>

				<div className="p-4 space-y-4 overflow-auto">
					{cartItems?.map((item) => (
						<div key={item.variant.id} className="flex gap-5">
							<img
								src={item?.variant?.images?.[0]}
								alt=""
								className="w-24 h-24 rounded-xl object-cover smooth-cover-fit"
							/>

							<div className="flex-1">
								<div className="flex items-center justify-between">
									<p className="font-semibold text-lg">{item?.product.name}</p>

									<p className="font-medium">
										{formatCurrency(item?.variant.price)}
									</p>
								</div>
								<p className="text-sm">{item?.product?.category?.name}</p>

								<button
									className="text-sm underline"
									onClick={() => removeItemFromCart(item.variant.id)}
								>
									Remove
								</button>
							</div>
						</div>
					))}
				</div>

				<DrawerFooter>
					<div>
						<div className="flex items-center justify-between py-4 border-y border-border my-4 font-semibold">
							<p>Subtotal</p>
							<p>{formatCurrency(subTotal)}</p>
						</div>

						<Link href="/checkout">
							<Button className="w-full rounded-full" size="lg">
								Checkout
							</Button>
						</Link>
					</div>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	)
}
