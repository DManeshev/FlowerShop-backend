import { Prisma } from '@prisma/client'

export const returnCategoryObject: Prisma.CategorySelect = {
	id: true,
	createdAt: true,
	name: true,
	slug: true,
	order: true,
	subCategories: true,
}
