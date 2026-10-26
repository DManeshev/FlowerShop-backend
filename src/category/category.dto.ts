import { IsNumber, IsOptional, IsString } from 'class-validator'

export class CategoryDto {
	@IsString()
	name: string

	@IsOptional()
	@IsNumber()
	order?: number

	@IsOptional()
	@IsNumber()
	parentId: number | null
}
