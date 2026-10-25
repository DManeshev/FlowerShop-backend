import { IsNumber, IsOptional, IsString } from 'class-validator'

export class SubCategoryDto {
	@IsString()
	name: string

	@IsNumber()
	categoryId: number

	@IsOptional()
	@IsNumber()
	order: number
}
