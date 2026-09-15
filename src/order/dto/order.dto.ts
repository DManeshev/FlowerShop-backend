import { EnumDeliveryMethod, EnumOrderStatus } from '@prisma/client'
import { Type } from 'class-transformer'
import {
	IsArray,
	IsEnum,
	IsNumber,
	IsOptional,
	IsString,
	ValidateNested
} from 'class-validator'

export class OrderDto {
	@IsOptional()
	@IsEnum(EnumOrderStatus)
	status: EnumOrderStatus

	@IsString()
	name: string

	@IsString()
	phone: string

	@IsString()
	@IsOptional()
	commentary: string

	@IsString()
	deliveryDate: string

	@IsString()
	deliveryTime: string

	@IsEnum(EnumDeliveryMethod)
	deliveryMethod: EnumDeliveryMethod

	@IsString()
	city: string

	@IsString()
	street: string

	@IsString()
	houseNumber: string

	@IsString()
	apartment: string

	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => OrderItemDto)
	items: OrderItemDto[]
}

export class OrderItemDto {
	@IsNumber()
	quantity: number

	@IsNumber()
	price: number

	@IsNumber()
	productId: number
}
