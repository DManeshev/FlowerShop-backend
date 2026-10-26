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
import { Auth } from '../auth/decorators/auth.decorator'
import { CategoryDto } from './category.dto'

@Controller('categories')
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) { }

	@HttpCode(200)
	@Get()
	async getAll() {
		return this.categoryService.getAll()
	}

	@HttpCode(200)
	@Get('subcategories')
	async getAllSubcategories() {
		return this.categoryService.getAllSubcategories()
	}

	@Auth()
	@HttpCode(200)
	@Get('subcategories/:parentId')
	async getSubcategoryByParentId(@Param('parentId') parentId: string) {
		return this.categoryService.getSubcategoryByParentId(+parentId)
	}

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
