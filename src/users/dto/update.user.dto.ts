import { IsString, IsEmail, IsOptional } from "class-validator"

export class UserUpdateDto {
    @IsString()
    @IsOptional()
    password: string
    @IsEmail()
    @IsOptional()
    email: string
}