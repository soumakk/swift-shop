'use client'

import { logoutFn } from '@/services/api/auth.api'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { createContext, ReactNode } from 'react'

interface IAuthContext {
	logout: () => void
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext)

export default function AuthProvider({ children }: { children: ReactNode }) {
	const queryClient = useQueryClient()
	const router = useRouter()

	async function logout() {
		await logoutFn()
		queryClient.clear()
		router.push('/login')
	}

	const contextValues = {
		logout,
	}

	return <AuthContext.Provider value={contextValues}>{children}</AuthContext.Provider>
}
