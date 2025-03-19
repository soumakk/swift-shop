'use client'
import AddressForm from '@/components/checkout/AddressForm'
import PaymentForm from '@/components/checkout/PaymentForm'
import Header from '@/components/layouts/Header'
import Breadcrumb from '@/components/ui/breadcrumb'
import { useCart } from '@/hooks/useCart'
import { formatCurrency } from '@/lib/utils'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useState } from 'react'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUB_KEY!)

export default function CheckoutPage() {
	const { cartItems, subTotal, cartTotal, deliveryCharge, removeItemFromCart } = useCart()
	const [currentStep, setCurrentStep] = useState(0)

	return (
		<div>
			<Header minimal />

			<div className="max-w-5xl mx-auto px-4 py-10">
				<div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
					<div className="col-span-3 space-y-5">
						<Breadcrumb
							active={currentStep}
							items={['Shipping', 'Payment']}
							onChange={setCurrentStep}
						/>

						{currentStep === 0 ? (
							<div className="">
								<div className="flex items-center justify-between">
									<h1 className="text-lg font-semibold">Shipping Address</h1>
								</div>
								<AddressForm onSubmit={() => setCurrentStep(1)} />
							</div>
						) : (
							<div>
								<div className="flex items-center justify-between">
									<h1 className="text-lg font-semibold">Payment Info</h1>
								</div>
								<Elements
									stripe={stripePromise}
									options={{
										mode: 'payment',
										currency: 'inr',
										amount: cartTotal,
									}}
								>
									<PaymentForm />
								</Elements>
							</div>
						)}
					</div>

					<div className="col-span-2">
						<h1 className="text-lg font-semibold mb-5">Shopping Bag</h1>

						<div className="space-y-4">
							{cartItems?.map((item) => (
								<div key={item.variant.id} className="flex gap-5">
									<img
										src={item?.variant?.images?.[0]}
										alt=""
										className="w-24 h-24 rounded-xl object-cover smooth-cover-fit"
									/>

									<div className="flex-1">
										<p className="font-semibold text-lg">
											{item?.product?.name}
										</p>

										<p>{formatCurrency(item?.variant?.price)}</p>
										<p>{item?.product?.category?.name}</p>

										<button
											className="text-sm underline cursor-pointer"
											onClick={() => removeItemFromCart(item.variant.id)}
										>
											Remove
										</button>
									</div>
								</div>
							))}
						</div>

						<h1 className="text-lg font-semibold my-5">Summary</h1>

						<div className="flex items-center justify-between my-3">
							<p>Subtotal</p>
							<p>{formatCurrency(subTotal)}</p>
						</div>
						<div className="flex items-center justify-between my-3">
							<p>Delivery Charge</p>
							<p>{formatCurrency(deliveryCharge)}</p>
						</div>

						<div className="flex items-center justify-between py-4 border-t border-border my-5 font-semibold">
							<p className="">Total</p>
							<p>{formatCurrency(cartTotal)}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
