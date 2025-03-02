import { forwardRef, useId, type ReactNode } from 'react'
import { Input } from '../ui/input'
import { cn } from '../../lib/utils'
import { Label } from '../ui/label'

interface InputFieldProps extends Omit<React.ComponentProps<'input'>, 'size'> {
	label?: string
	startIcon?: ReactNode
	error?: string
	// size?: 'sm' | 'md' | 'lg'
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
	({ label, className, startIcon, id, error, ...props }, ref) => {
		const uid = useId()
		const fieldId = id ?? uid
		return (
			<div className="flex flex-col gap-2">
				{label ? <Label htmlFor={fieldId}>{label}</Label> : null}

				<div className="relative">
					<Input
						ref={ref}
						className={cn(className, { 'ps-12': startIcon })}
						id={fieldId}
						{...props}
					/>

					{startIcon ? (
						<div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-5 text-muted-foreground/80 peer-disabled:opacity-50">
							{startIcon}
						</div>
					) : null}
				</div>

				{error ? <p className="text-red-600 text-xs">{error}</p> : null}
			</div>
		)
	}
)

InputField.displayName = 'InputField'

export default InputField
