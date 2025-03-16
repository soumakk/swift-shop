export function getUrl(url: string) {
	return `${process.env.NEXT_PUBLIC_SERVER_URL}/api${url}`
}

export async function fetchFn<T>(
	url: string,
	method: 'POST' | 'GET' | 'PUT' | 'DELETE',
	body?: object,
	headers: object = {}
): Promise<T | null> {
	try {
		const res = await fetch(getUrl(url), {
			method,
			credentials: 'include',
			body: body ? JSON.stringify(body) : undefined,
			headers: {
				'Content-Type': 'application/json',
				...headers,
			},
		})

		if (!res.ok) {
			const error = await res.json()
			throw new Error(error.error ?? 'An unexpected error occurred')
		}

		return (await res.json()) as T
	} catch (error) {
		console.error('API Error:', error)
		return null
	}
}

export interface IApiRes<T> {
	data: T
}
