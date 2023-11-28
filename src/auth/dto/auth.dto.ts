import { IsEmail, MinLength, IsString } from "class-validator";

export class AuthDto {
    @IsEmail()
    email: string

    @MinLength(6, {
        message: 'Пароль должен быть не меньше 6 символов'
    })
    @IsString()
    password: string
}