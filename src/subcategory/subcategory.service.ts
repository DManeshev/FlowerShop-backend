import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { SubCategoryDto } from './subcategory.dto'
import { generateSlug } from 'src/utils/generate-slug'
import { returnSubCategoryObject } from './return-category.object'

@Injectable()
export class SubcategoryService {
	constructor(private prisma: PrismaService) {}

	async getAll() {
		return this.prisma.subcategory.findMany({
			select: returnSubCategoryObject
		})
	}

	async byId(id: number) {
		return this.prisma.subcategory.findUnique({
			where: { id }
		})
	}

	async getByCategory(id: number) {
		return this.prisma.subcategory.findMany({
			where: {
				categoryId: id
			}
		})
	}

	async getBySlug(slug: string) {
		return this.prisma.subcategory.findUnique({
			where: {
				slug
			}
		})
	}

	async create(dto: SubCategoryDto) {
		return this.prisma.subcategory.create({
			data: {
				name: dto.name,
				icon: dto.icon,
				slug: generateSlug(dto.name),
				category: {
					connect: {
						id: dto.categoryId
					}
				}
			}
		})
	}

	async update(id: number, dto: SubCategoryDto) {
		const { name, icon, categoryId } = dto

		return this.prisma.subcategory.update({
			where: { id },
			data: {
				name,
				icon,
				slug: generateSlug(name),
				category: {
					connect: {
						id: categoryId
					}
				}
			}
		})
	}

	async delete(id: number) {
		return this.prisma.subcategory.delete({
			where: { id }
		})
	}
}
