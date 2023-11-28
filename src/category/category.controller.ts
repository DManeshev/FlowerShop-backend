import {
	Controller,
	Get,
	HttpCode,
	UsePipes,
	Put,
	ValidationPipe,
	Body,
	Param,
	Post,
	Delete
} from '@nestjs/common'
import { CategoryService } from './category.service'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CategoryDto } from './category.dto'

@Controller('categories')
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	@Get()
	async getAll() {
		return this.categoryService.getAll()
	}

	@Auth()
	@Get(':id')
	async getById(@Param('id') id: string) {
		return this.categoryService.byId(+id)
	}

	@Get('by-slug/:slug')
	async getBySlug(@Param('slug') slug: string) {
		return this.categoryService.bySlug(slug)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	@Post()
	async create(@Body() dto: CategoryDto) {
		return this.categoryService.create(dto)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	@Put(':id')
	async update(@Param('id') id: string, @Body() dto: CategoryDto) {
		return this.categoryService.update(+id, dto)
	}

	@HttpCode(200)
	@Auth()
	@Delete(':id')
	async delete(@Param('id') id: string) {
		return this.categoryService.delete(+id)
	}
}
