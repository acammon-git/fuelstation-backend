import { IsBoolean, IsDate, IsEmail, IsNumber, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
    @IsEmail()
    email: string;

    @IsString()
    nombre: string;

    @IsString()
    password: string;

    @IsOptional()
    telefono: number;

    @IsString()
    pais: string;


    @IsOptional()
    foto: string;

    @IsOptional()
    activo: number;

    @IsOptional()
    last_login: string;
}
