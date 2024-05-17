import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { returnCategoryObject } from './return-category.object'
import { CategoryDto } from './category.dto'
import { generateSlug } from 'src/utils/generate-slug'

@Injectable()
export class CategoryService {
	constructor(private prisma: PrismaService) {}

	async getAll() {
		return this.prisma.category.findMany({
			select: returnCategoryObject,
			orderBy: {
				id: 'asc'
			}
		})
	}

	async byId(id: number) {
		const category = await this.prisma.category.findUnique({
			where: { id },
			select: returnCategoryObject
		})

		if (!category) throw new Error('Категория не найдена')

		return category
	}

	async bySlug(slug: string) {
		const category = await this.prisma.category.findUnique({
			where: { slug },
			select: returnCategoryObject
		})

		if (!category) throw new Error('Категория не найдена')

		return category
	}

	async create(dto: CategoryDto) {
		return this.prisma.category.create({
			data: {
				name: dto.name,
				slug: generateSlug(dto.name),
				icon: dto.icon,
        order: dto.order
			}
		})
	}

	async update(id: number, dto: CategoryDto) {
		return this.prisma.category.update({
			where: { id },
			data: {
				name: dto.name,
				slug: generateSlug(dto.name),
				icon: dto.icon
			}
		})
	}

	async delete(id: number) {
		return this.prisma.category.delete({
			where: { id }
		})
	}
}
