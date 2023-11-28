import { IsNumber, IsString } from "class-validator";

export class SubCategoryDto {
    @IsString()
    name: string

    @IsString()
    icon: string

    @IsNumber()
    categoryId: number
}