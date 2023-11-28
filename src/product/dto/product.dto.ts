import { EnumProductStatus } from '@prisma/client'
import { Type } from 'class-transformer'
import {
	ArrayMinSize,
	IsArray,
	IsBoolean,
	IsEnum,
	IsNumber,
	IsOptional,
	IsString,
	ValidateNested
} from 'class-validator'
import { FlowerDto } from 'src/flowers/flower.dto'

export class ProductDto {
	@IsString()
	name: string

	@IsOptional()
	@IsString()
	description: string

	@IsNumber()
	price: number

	@IsString({ each: true })
	@ArrayMinSize(1)
	images: string[]

	@IsNumber()
	categoryId: number

	@IsNumber()
	subcategoryId: number

	@IsEnum(EnumProductStatus)
	status: EnumProductStatus

	@IsBoolean()
	isDelivery: boolean

	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => FlowerDto)
	flowers: FlowerDto[]
}
