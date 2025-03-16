import { useQuery } from '@tanstack/react-query'
import { fetchProfile } from '../api/auth.api'

export function useUser() {
	const { data, isLoading } = useQuery({
		queryKey: ['profile'],
		queryFn: fetchProfile,
		retry: 1,
	})
	return {
		user: data,
		isLoading,
	}
}
