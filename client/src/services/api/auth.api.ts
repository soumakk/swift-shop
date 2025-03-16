import { IUser } from '@/types/user.types'
import { fetchFn, IApiRes } from '.'

export async function fetchProfile() {
	const res = await fetchFn<IApiRes<IUser>>(`/profile`, 'GET')
	return res?.data
}

export async function loginFn({ token }: { token: string }) {
	const res = await fetchFn<IApiRes<IUser>>(`/login`, 'POST', { token })
	return res?.data
}

export async function logoutFn() {
	const res = await fetchFn<IApiRes<IUser>>(`/logout`, 'DELETE')
	return res?.data
}
