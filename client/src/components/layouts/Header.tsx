'use client'

import { useAuth } from '@/hooks/useAuth'
import { useCart } from '@/hooks/useCart'
import BagIcon from '@/icons/BagIcon'
import UserIcon from '@/icons/UserIcon'
import { useUser } from '@/services/query/query'
import Link from 'next/link'
import { useState } from 'react'
import CartDrawer from '../products/CartDrawer'
import { Avatar, AvatarFallback } from '../ui/avatar'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import FloatingCounter from '../ui/FloatingCounter'
import { IconButton } from '../ui/IconButton'

export default function Header({ minimal }: { minimal?: boolean }) {
	const { cartCount } = useCart()
	const { logout } = useAuth()
	const { user } = useUser()
	const [isCartOpen, setIsCartOpen] = useState(false)
	return (
		<header className="max-w-5xl mx-auto px-4">
			<div className="flex items-center justify-between h-20">
				<Link href="/">
					<h2 className="text-xl font-semibold">
						Swift.<span className="text-gray-400">Shop</span>
					</h2>
				</Link>

				<div className="flex items-center gap-1">
					{!minimal && (
						<>
							<FloatingCounter count={cartCount}>
								<IconButton onClick={() => setIsCartOpen(true)}>
									<BagIcon size={20} className="mb-0.5" />
								</IconButton>
							</FloatingCounter>

							{/* <IconButton>
								<LoveIcon size={20} />
							</IconButton> */}
						</>
					)}

					{user ? (
						<DropdownMenu>
							<DropdownMenuTrigger className="h-10 w-10 grid place-content-center">
								<Avatar>
									<AvatarFallback className="text-blue-600 bg-blue-100 font-bold">
										{user?.name?.slice(0, 1)}
									</AvatarFallback>
								</Avatar>
							</DropdownMenuTrigger>

							<DropdownMenuContent>
								<DropdownMenuItem>Profile</DropdownMenuItem>
								<DropdownMenuItem>Orders</DropdownMenuItem>
								<Link href="/wishlist">
									<DropdownMenuItem>Wishlist</DropdownMenuItem>
								</Link>
								<DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					) : (
						<Link href="/login">
							<IconButton>
								<UserIcon size={20} />
							</IconButton>
						</Link>
					)}
				</div>
			</div>

			<CartDrawer open={isCartOpen} onClose={() => setIsCartOpen(false)} />
		</header>
	)
}
