import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from '../../auth/entities/create-user.dto';
import { IsString, IsEmail, IsNumber, IsOptional } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
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
    @IsString()
    provincia: string;

    @IsOptional()
    last_login: string;

    @IsString()
    foto: string;

    @IsOptional()
    activo: number;
}
