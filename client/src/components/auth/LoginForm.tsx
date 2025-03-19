'use client'

import InputField from '@/components/fields/InputField'
import PasswordField from '@/components/fields/PasswordField'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { auth } from '@/lib/firebase'
import { loginFn } from '@/services/api/auth.api'
import { useForm } from '@tanstack/react-form'
import { getIdToken, signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState, type FormEvent } from 'react'
import { toast } from 'react-hot-toast'

export default function LoginForm() {
	const router = useRouter()
	const [isLoading, setIsLoading] = useState(false)
	const searchParams = useSearchParams()
	const redirectUrl = searchParams.get('redirect')

	const form = useForm({
		defaultValues: {
			email: 'test@yopmail.com',
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

				try {
					await loginFn({ token })
				} catch (error) {
					throw new Error('Login failed')
				}

				if (redirectUrl) {
					router.push(redirectUrl)
				} else {
					router.push('/')
				}
			} catch (error) {
				if ((error as Error)?.message?.includes('auth/invalid-credential')) {
					toast.error('Email or password is wrong')
				} else {
					toast.error((error as Error)?.message)
				}
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
					<p className="max-w-md mx-auto text-sm text-muted-foreground mt-2 text-center">
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

					<div className="">
						<div className="flex justify-between items-center">
							<Label htmlFor="password">Password</Label>
							{/* <a href="#" className="text-xs underline text-primary">
								Forgot password?
							</a> */}
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

				<p className="text-sm text-center mt-8 text-muted-foreground">
					By continuing, you agree to the terms and conditions
				</p>

				{/* <p className="text-sm text-center mt-8">
					Don&apos;t have an account?{' '}
					<Link href="/signup" className="text-primary underline">
						Sign up
					</Link>
				</p> */}
			</div>
		</div>
	)
}
