import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	UsePipes,
	ValidationPipe,
	Put
} from '@nestjs/common'
import { FlowersService } from './flowers.service'
import { Auth } from '../auth/decorators/auth.decorator'
import { FlowerDto } from './flower.dto'

@Controller('flowers')
export class FlowersController {
	constructor(private readonly flowersService: FlowersService) {}

	@Get()
	async getAll() {
		return this.flowersService.getAll()
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	@Post()
	async createFlower(@Body() dto: FlowerDto) {
		return this.flowersService.create(dto)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	@Put(':id')
	async updateFlower(@Param('id') id: string, @Body() dto: FlowerDto) {
		return this.flowersService.update(+id, dto)
	}

	@HttpCode(200)
	@Auth()
	@Delete(':id')
	async deleteFlower(@Param('id') id: string) {
		return this.flowersService.delete(+id)
	}
}
