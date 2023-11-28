import { Injectable, NotFoundException } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PaginationService } from 'src/pagination/pagination.service'
import { PrismaService } from 'src/prisma.service'
import { generateSlug } from 'src/utils/generate-slug'
import { EnumProductSort, GetAllProductDto } from './dto/get-all.products.dto'
import { ProductDto } from './dto/product.dto'
import { returnProductObject } from './return-product.object'

@Injectable()
export class ProductService {
	constructor(
		private prisma: PrismaService,
		private paginationService: PaginationService
	) {}

	async getAll(dto: GetAllProductDto = {}) {
		const { sort, searchTerm } = dto

		const prismaSort: Prisma.ProductOrderByWithRelationInput[] = []

		if (sort === EnumProductSort.LOW_PRICE) {
			prismaSort.push({ price: 'asc' })
		} else {
			prismaSort.push({ price: 'desc' })
		}

		const prismaSearchTermFilter: Prisma.ProductWhereInput = searchTerm
			? {
				OR: [
					{
						name: {
							contains: searchTerm,
							mode: 'insensitive'
						}
					},
					{
						description: {
							contains: searchTerm,
							mode: 'insensitive'
						}
					},
					{
						category: {
							name: {
								contains: searchTerm,
								mode: 'insensitive'
							}
						}
					}
				]
			  }
			: {}

		const { perPage, skip } = this.paginationService.getPagination(dto)

		const products = await this.prisma.product.findMany({
			where: prismaSearchTermFilter,
			orderBy: prismaSort,
			skip,
			take: perPage
		})

		return {
			products,
			length: await this.prisma.product.count({
				where: prismaSearchTermFilter
			})
		}
	}

	async byId(id: number) {
		const product = await this.prisma.product.findUnique({
			where: { id },
			select: returnProductObject
		})

		if (!product) throw new NotFoundException('Товар не найден')

		return product
	}

	async bySlug(slug: string) {
		const product = await this.prisma.product.findUnique({
			where: { slug },
			select: returnProductObject
		})

		if (!product) throw new NotFoundException('Товар не найден')

		return product
	}

	async byCategory(categorySlug: string) {
		const products = await this.prisma.product.findMany({
			where: {
				category: {
					slug: categorySlug
				}
			}
		})

		if (!products)
			throw new NotFoundException('Товары для данной категории не найдены')

		return products
	}

	async create(dto: ProductDto) {
		const product = await this.prisma.product.create({
			data: {
				name: dto.name,
				slug: generateSlug(dto.name),
				description: dto.description,
				price: dto.price,
				images: dto.images,
				category: {
					connect: {
						id: dto.categoryId
					}
				},
				subcategory: {
					connect: {
						id: dto.subcategoryId
					}
				},
				status: dto.status,
				isDelivery: dto.isDelivery,
				flowers: {
					connect: dto.flowers.map(flower => ({
						id: flower.id
					}))
				}
			},
			include: {
				flowers: true
			}
		})

		return product.id
	}

	async update(id: number, dto: ProductDto) {
		const {
			name,
			description = '',
			price,
			images,
			categoryId,
			subcategoryId,
			status,
			isDelivery,
			flowers
		} = dto

		const existingProduct = await this.prisma.product.findUnique({
			where: { id },
			include: { flowers: true }
		})

		const currentFlowerIds = existingProduct.flowers.map(flower => flower.id)
		const disconnectFlowerIds = currentFlowerIds.filter(
			id => !flowers.some(flower => flower.id === id)
		)
		// const connectFlowers = flowers.filter(flower => !currentFlowerIds.includes(flower.id))

		return this.prisma.product.update({
			where: {
				id
			},
			data: {
				name,
				description,
				price,
				images,
				status,
				isDelivery,
				slug: generateSlug(name),
				category: {
					connect: {
						id: categoryId
					}
				},
				subcategory: {
					connect: {
						id: subcategoryId
					}
				},
				flowers: {
					disconnect: disconnectFlowerIds.map(id => ({ id })),
					connect: flowers.map(flower => ({ id: flower.id }))
				}
			},
			include: {
				flowers: true
			}
		})
	}

	async delete(id: number) {
		return this.prisma.product.delete({ where: { id } })
	}
}
