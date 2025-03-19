import { verifySession } from '@/lib/auth.middleware.ts'
import prisma from '@/lib/prisma.ts'
import type { IVariables } from '@/types/auth.types.ts'
import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'

const app = new Hono<{ Variables: IVariables }>()

app.get('/', verifySession, async (c) => {
	try {
		const userId = c.get('userId')

		const wishlist = await prisma.wishlist.findMany({
			where: {
				userId: userId,
			},
			include: {
				variant: {
					include: {
						product: true,
					},
				},
			},
		})

		return c.json({ data: wishlist })
	} catch (error) {
		throw new HTTPException(500, {
			message: 'Internal server error',
		})
	}
})

app.post('/', verifySession, async (c) => {
	try {
		const userId = c.get('userId')
		const body = await c.req.json()

		const wishlist = await prisma.wishlist.create({
			data: {
				variantId: body.variantId,
				userId: userId,
			},
		})

		return c.json({ data: wishlist })
	} catch (error) {
		throw new HTTPException(500, {
			message: 'Internal server error',
		})
	}
})

app.delete('/:wishlistId', verifySession, async (c) => {
	try {
		const params = await c.req.param()

		const wishlist = await prisma.wishlist.delete({
			where: {
				id: params.wishlistId,
			},
		})

		return c.json({ data: wishlist })
	} catch (error) {
		throw new HTTPException(500, {
			message: 'Internal server error',
		})
	}
})

export default app
