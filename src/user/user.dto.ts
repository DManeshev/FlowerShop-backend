import { IsBoolean, IsEmail, IsOptional, IsString } from "class-validator";

export class UserDto {
    @IsOptional()
    @IsEmail()
    email: string

    @IsOptional()
    @IsString()
    password: string

    @IsOptional()
    @IsString()
    name: string

    @IsOptional()
    @IsString()
    avatarPath: string

    @IsOptional()
    phone: string

    @IsBoolean()
    isAdmin: boolean
}