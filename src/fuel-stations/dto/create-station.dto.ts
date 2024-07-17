import { IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateStation {
 
  @IsNumber()
  id_usuario: number;
  @IsNumber()
  id_gasolinera: number;
  
  @IsString()
  municipio: string;

  @IsNumber()
  id_provincia: number;

  @IsString()
  direccion: string;

  @IsString()
  localidad: string;

  @IsString()
  horario: string;

  @IsString()
  rotulo: string;

  @IsNumber()
  @IsOptional() // Para indicar que el campo es opcional
  latitud?: number;

  @IsNumber()
  @IsOptional()
  longitud?: number;

  @IsNumber()
  @IsOptional()
  precio_gasoleoA?: number;

  @IsNumber()
  @IsOptional()
  precio_gasoleoB?: number;

  @IsNumber()
  @IsOptional()
  precio_gasolina95?: number;
}