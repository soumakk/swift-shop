'use client'

import { getUrl } from '@/services/api'
import { Role } from '@/types/common.types'
import { useForm } from '@tanstack/react-form'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useState, type FormEvent } from 'react'
import { getIdToken, signInWithEmailAndPassword } from 'firebase/auth'
import { toast } from 'sonner'
import { auth } from '@/lib/firebase'
import InputField from '@/components/fields/InputField'
import { Label } from '@/components/ui/label'
import PasswordField from '@/components/fields/PasswordField'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

export default function LoginForm() {
	const router = useRouter()
	const [isLoading, setIsLoading] = useState(false)
	const searchParams = useSearchParams()
	const redirectUrl = searchParams.get('redirect')

	const form = useForm({
		defaultValues: {
			email: 'soumak@yopmail.com',
			password: 'Password@123',
		},
		onSubmit: async ({ value }) => {
			setIsLoading(true)
			try {
				const userCredential = await signInWithEmailAndPassword(
					auth,
					value.email,
					value.password
				)
				const token = await getIdToken(userCredential?.user)
				const res = await fetch(getUrl('/login'), {
					method: 'POST',
					credentials: 'include',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ token }),
				})
				if (!res.ok) {
					throw new Error('Login failed')
				}
				const data = await res.json()

				if (data?.user?.role === Role.Admin) {
					router.push('/dashboard')
				} else if (redirectUrl) {
					router.push(redirectUrl)
				} else {
					router.push('/')
				}
			} catch (error) {
				toast.error((error as Error)?.message)
			} finally {
				setIsLoading(false)
			}
		},
	})

	function handleSubmit(e: FormEvent) {
		e.preventDefault()
		e.stopPropagation()
		form.handleSubmit()
	}

	return (
		<div className="h-screen flex items-center justify-center bg-background">
			<div>
				<div className="mb-12">
					<h1 className="text-4xl font-semibold text-center">Welcome back</h1>
					<p className="max-w-md mx-auto text-sm text-muted-foreground mt-4 text-center">
						Log in to access your account and stay connected
					</p>
				</div>

				<form className="space-y-6 min-w-[440px] mx-auto" onSubmit={handleSubmit}>
					<form.Field name="email">
						{(field) => (
							<InputField
								id={field.name}
								value={field.state.value}
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
								label="Email address"
								placeholder="Enter your email address"
								// startIcon={<Mail size={16} />}
							/>
						)}
					</form.Field>

					<div className="space-y-3">
						<div className="flex justify-between items-center">
							<Label htmlFor="password">Password</Label>
							<a href="#" className="text-xs underline text-primary">
								Forgot password?
							</a>
						</div>
						<form.Field name="password">
							{(field) => (
								<PasswordField
									placeholder="Enter the password"
									id={field.name}
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
								/>
							)}
						</form.Field>
					</div>

					<Button size="lg" className="w-full" disabled={isLoading}>
						Sign in
					</Button>

					{/* <div className="space-y-4">
					<Button className="w-full" size="lg" variant="outline">
						<GoogleIcon />
						<span>Sign in with Google</span>
					</Button>

					<Button className="w-full" size="lg" variant="outline">
						<GithubIcon />
						<span>Sign in with GitHub</span>
					</Button>
				</div> */}
				</form>

				<p className="text-sm text-center mt-8">
					Don&apos;t have an account?{' '}
					<Link href="/signup" className="text-primary underline">
						Sign up
					</Link>
				</p>
			</div>
		</div>
	)
}
