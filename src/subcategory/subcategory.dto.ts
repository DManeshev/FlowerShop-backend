import { IsNumber, IsOptional, IsString } from 'class-validator'

export class SubCategoryDto {
	@IsString()
	name: string

	@IsString()
	@IsOptional()
	icon: string

	@IsNumber()
	categoryId: number

	@IsOptional()
	@IsNumber()
	order: number
}
