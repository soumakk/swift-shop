'use client'

import Link from 'next/link'
import FloatingCounter from '../ui/FloatingCounter'
import { IconButton } from '../ui/IconButton'
import BagIcon from '@/icons/BagIcon'
import LoveIcon from '@/icons/LoveIcon'
import { Button } from '../ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { useCart } from '@/hooks/useCart'
import CartDrawer from '../products/CartDrawer'
import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useUser } from '@/services/query/user.query'

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

				<div className="flex items-center gap-3">
					{!minimal && (
						<>
							<FloatingCounter count={cartCount}>
								<IconButton onClick={() => setIsCartOpen(true)}>
									<BagIcon size={24} className="mb-0.5" />
								</IconButton>
							</FloatingCounter>

							<IconButton>
								<LoveIcon size={24} />
							</IconButton>
						</>
					)}

					{user ? (
						<DropdownMenu>
							<DropdownMenuTrigger>
								<Avatar className="">
									<AvatarFallback className="text-blue-600 bg-blue-100 font-bold">
										{user?.name?.slice(0, 1)}
									</AvatarFallback>
								</Avatar>
							</DropdownMenuTrigger>

							<DropdownMenuContent>
								<DropdownMenuItem>Profile</DropdownMenuItem>
								<DropdownMenuItem>Orders</DropdownMenuItem>
								<DropdownMenuItem>Wishlist</DropdownMenuItem>
								<DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					) : (
						<Link href="/login">
							<Button>Login</Button>
						</Link>
					)}
				</div>
			</div>

			<CartDrawer open={isCartOpen} onClose={() => setIsCartOpen(false)} />
		</header>
	)
}
