import { generateNanoid } from '@/lib/helpers.ts'
import prisma from '@/lib/prisma.ts'
import type { ICreateProductBody } from '@/types/product.types.ts'
import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'

const app = new Hono()

app.post('/', async (c) => {
	try {
		const body = await c.req.json()

		const whereQuery = {} as {
			categoryId?: string
		}

		if (body?.categoryId) {
			whereQuery.categoryId = body.categoryId
		}

		const data = await prisma.product.findMany({
			include: {
				category: true,
				variants: true,
			},
			where: whereQuery,
		})
		return c.json({ data })
	} catch (error) {
		throw new HTTPException(400, {
			message: 'Internal server error. Please try again',
		})
	}
})
app.post('/create', async (c) => {
	try {
		const body = (await c.req.json()) as ICreateProductBody

		// create the product
		const product = await prisma.product.create({
			data: {
				name: body.name,
				description: body.description,
				categoryId: body.categoryId,
			},
		})

		// create multiple variants
		const createdVariants = await Promise.all(
			body?.variants?.map(async (variant) => {
				const newVariant = await prisma.productVariant?.create({
					data: {
						color: variant?.color,
						price: variant?.price,
						sku: generateNanoid(12),
						productId: product?.id,
						images: variant?.images,
					},
				})

				return newVariant
			})
		)

		// connect variant ids to product
		await prisma.product.update({
			where: { id: product.id },
			data: {
				variants: {
					connect: createdVariants?.map((variant) => ({ id: variant.id })),
				},
			},
		})

		const finalProduct = await prisma.product.findUnique({
			where: { id: product.id },
			include: {
				variants: true,
			},
		})

		return c.json({ data: finalProduct })
	} catch (error) {
		console.log(error)
		throw new HTTPException(400, {
			message: 'Internal server error. Please try again',
		})
	}
})

app.get('/:productId', async (c) => {
	try {
		const params = await c.req.param()
		const data = await prisma.product.findFirst({
			include: {
				category: true,
				variants: true,
			},
			where: {
				id: params.productId,
			},
		})
		return c.json({ data })
	} catch (error) {
		throw new HTTPException(400, {
			message: 'Internal server error. Please try again',
		})
	}
})

export default app
