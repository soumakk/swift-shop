import { cn } from '@/lib/utils'
import React, { Fragment } from 'react'

export default function Breadcrumb({
	active,
	items,
	onChange,
}: {
	items: string[]
	active: number
	onChange: (idx: number) => void
}) {
	return (
		<div className="flex items-center text-sm gap-2">
			{items?.map((item, idx) => (
				<Fragment key={idx}>
					<p
						className={cn('text-slate-400 ', {
							'text-slate-900 font-medium': active >= idx,
						})}
						onClick={() => onChange(idx)}
					>
						{item}
					</p>
					{items?.length - 1 !== idx ? (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							className="size-4 mt-1"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="m8.25 4.5 7.5 7.5-7.5 7.5"
							/>
						</svg>
					) : null}
				</Fragment>
			))}
		</div>
	)
}
