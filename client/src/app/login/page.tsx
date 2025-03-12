'use client'

import LoginForm from '@/components/auth/LoginForm'
import { Suspense } from 'react'

export default function LoginPage() {
	return (
		<Suspense>
			<LoginForm />
		</Suspense>
	)
}
