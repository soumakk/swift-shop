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

export default function Header({ minimal }: { minimal?: boolean }) {
	return (
		<header className="max-w-5xl mx-auto px-4">
			<div className="flex items-center justify-between h-20">
				<Link href="/">
					<h2 className="text-xl font-semibold">
						Lux.<span className="text-gray-400">Shop</span>
					</h2>
				</Link>

				<div className="flex items-center gap-3">
					{!minimal && (
						<>
							<FloatingCounter count={1}>
								<IconButton>
									<BagIcon size={24} className="mb-0.5" />
								</IconButton>
							</FloatingCounter>

							<IconButton>
								<LoveIcon size={24} />
							</IconButton>
						</>
					)}
					<DropdownMenu>
						<DropdownMenuTrigger>
							<Avatar className="bg-blue-200">
								<AvatarFallback>S</AvatarFallback>
							</Avatar>
						</DropdownMenuTrigger>

						<DropdownMenuContent>
							<DropdownMenuItem>Profile</DropdownMenuItem>
							<DropdownMenuItem>Orders</DropdownMenuItem>
							<DropdownMenuItem>Wishlist</DropdownMenuItem>
							<DropdownMenuItem>Logout</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>

					<Link href="/login">
						<Button>Login</Button>
					</Link>
				</div>
			</div>
		</header>
	)
}
