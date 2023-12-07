import {
	Body,
	Controller,
	Delete,
	HttpCode,
	Param,
	Post,
	Put,
	UsePipes,
	ValidationPipe,
	Get
} from '@nestjs/common'
import { SubcategoryService } from './subcategory.service'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { SubCategoryDto } from './subcategory.dto'

@Controller('subcategory')
export class SubcategoryController {
	constructor(private readonly subcategoryService: SubcategoryService) {}

	@Get()
	async getAll() {
		return this.subcategoryService.getAll()
	}

	@Get('by-category/:id')
	async getByCategory(@Param('id') id: string) {
		return this.subcategoryService.getByCategory(+id)
	}

	@Get('by-slug/:slug')
	async getBySlug(@Param('slug') slug: string) {
		return this.subcategoryService.getBySlug(slug)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	@Post()
	async create(@Body() dto: SubCategoryDto) {
		return this.subcategoryService.create(dto)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	@Put(':id')
	async update(@Param('id') id: string, @Body() dto: SubCategoryDto) {
		return this.subcategoryService.update(+id, dto)
	}

	@HttpCode(200)
	@Auth()
	@Delete(':id')
	async delete(@Param('id') id: string) {
		return this.subcategoryService.delete(+id)
	}
}
