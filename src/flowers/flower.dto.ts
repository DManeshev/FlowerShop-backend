import { IsNumber, IsOptional, IsString } from "class-validator";

export class FlowerDto {
    @IsOptional()
    @IsNumber()
    id: number

    @IsString()
    name: string
}