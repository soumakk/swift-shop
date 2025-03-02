export interface ICategory {
	id: string
	name: string
}

export interface IProduct {
	id: string
	createdAt: string
	updatedAt: string
	name: string
	description: string
	categoryId: number
	brandId: number
	category: ICategory
	variants: IProductVariant[]
}

export interface IProductVariant {
	id: string
	color: string
	price: number
	sku: string
	productId: string
	images: string[]
}
