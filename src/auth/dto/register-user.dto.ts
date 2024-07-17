import { IsBoolean, IsDate, IsEmail, IsEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';



export class RegisterUserDto {

    @IsEmail()
    email: string;

    @IsString()
    nombre: string;

    @IsString()
    password: string;

    @IsOptional()
    telefono:number;

    @IsString()
    pais: string;

    @IsString()
    provincia: string;

    @IsOptional()
    foto: string;

    @IsOptional()
    activo:number;

    @IsOptional()
    last_login: string;
}
