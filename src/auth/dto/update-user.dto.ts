import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsEmail, IsNumber, IsOptional } from 'class-validator';
import { RegisterUserDto } from './register-user.dto';

export class UpdateAuthDto extends PartialType(RegisterUserDto) {
    @IsString()
    nombre: string;

    @IsString()
    @IsOptional()
    password: string;

    @IsEmail()
    email: string;

    @IsNumber()
    telefono:number;

    @IsString()
    pais: string;

    
    last_login: string;

    @IsString()
    foto: string;

    activo:number;
}
