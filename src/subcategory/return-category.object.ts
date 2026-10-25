import { Prisma } from '@prisma/client'

export const returnSubCategoryObject: Prisma.SubcategorySelect = {
	id: true,
	name: true,
	slug: true,
	categoryId: true
}