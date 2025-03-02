import { z } from 'zod'

export const ZCreateProductBody = z.object({
	name: z.string(),
	description: z.string().optional(),
	categoryId: z.string(),
	variants: z
		.object({
			color: z.string(),
			price: z.number(),
			images: z.string().array(),
		})
		.array(),
})
export type ICreateProductBody = z.infer<typeof ZCreateProductBody>

export const ZGetProductsFilters = z.object({
	categoryId: z.string().optional(),
	price: z.string().optional(),
})
export type IGetProductsFilters = z.infer<typeof ZGetProductsFilters>
