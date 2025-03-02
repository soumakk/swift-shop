import React, { useId } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Label } from '@/components/ui/label'

interface SelectFieldProps {
	options: {
		label: string
		value: string
	}[]
	value?: string
	onChange?: (value: string) => void
	label?: string
	id?: string
}

export default function SelectField(props: SelectFieldProps) {
	const { options, value, onChange, label, id } = props
	const uid = useId()
	const fieldId = id ?? uid
	return (
		<div className="flex flex-col gap-2">
			{label ? <Label htmlFor={fieldId}>{label}</Label> : null}

			<Select value={value} onValueChange={onChange}>
				<SelectTrigger id={fieldId}>
					<SelectValue />
				</SelectTrigger>
				<SelectContent>
					{options?.map((opt) => (
						<SelectItem key={opt.value} value={opt.value}>
							{opt.label}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	)
}
