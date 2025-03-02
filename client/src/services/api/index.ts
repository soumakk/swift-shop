export function getUrl(url: string) {
	return `${process.env.NEXT_PUBLIC_SERVER_URL}/api${url}`
}

export async function fetchFn<T>(
	url: string,
	method: 'POST' | 'GET' | 'PUT' | 'DELETE',
	body?: object
) {
	const res = await fetch(getUrl(url), {
		method,
		credentials: 'include',
		body: JSON.stringify(body),
		headers: {
			'Content-Type': 'application/json',
		},
	})

	if (!res.ok) {
		const error = await res.json()
		throw new Error(error.error ?? 'An unexpected error occurred')
	}

	return (await res.json()) as T
}

export interface IApiRes<T> {
	data: T
}
