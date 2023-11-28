import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { FlowerDto } from './flower.dto'

@Injectable()
export class FlowersService {
	constructor(private prisma: PrismaService) {}

	async getAll() {
		return this.prisma.flower.findMany({
			orderBy: {
				name: 'asc'
			}
		})
	}

	async create(dto: FlowerDto) {
		const flower = await this.prisma.flower.create({
			data: {
				name: dto.name
			}
		})

		return flower.id
	}

	async update(id: number, dto: FlowerDto) {
		const { name } = dto

		return this.prisma.flower.update({
			where: { id },
			data: {
				name
			}
		})
	}

	async delete(id: number) {
		return this.prisma.flower.delete({ where: { id } })
	}
}
