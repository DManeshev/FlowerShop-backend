import { Type } from "class-transformer";
import { IsArray, IsOptional, IsString, ValidateNested } from "class-validator";
import { SubCategoryDto } from "src/subcategory/subcategory.dto";

export class CategoryDto {
    @IsString()
    name: string

    @IsString()
    @IsOptional() 
    icon: string

    @IsOptional()
    @IsArray()
	@ValidateNested({ each: true })
	@Type(() => SubCategoryDto)
	subCategories: SubCategoryDto[]
}