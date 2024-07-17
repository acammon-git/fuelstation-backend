import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorite } from './entities/favorite.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private favoriteRepository: Repository<Favorite>,
    
  ) { }
  async create(createFavoriteDto: CreateFavoriteDto): Promise<Favorite> {
    try {
      const { id_usuario, id_gasolinera, ...favoriteData } = createFavoriteDto;

      // Verificar si ya existe una gasolinera con el mismo id
      const existingFavorite = await this.favoriteRepository.findOne({ where: { id_gasolinera } });

      if (existingFavorite) {
        // Lanzar una excepción si la gasolinera ya está añadida
        throw new BadRequestException(`Gasolinera ya añadida.`);
      }

      // Crear una nueva instancia de Favorito con los datos proporcionados
      const newFavorite = this.favoriteRepository.create({ id_usuario, id_gasolinera, ...favoriteData });

      // Guardar la nueva instancia en la base de datos
      await this.favoriteRepository.save(newFavorite);

      // Devolver los datos del nuevo Favorito
      const { ...favorite } = newFavorite;
      return favorite;
    } catch (error) {
      console.error('Error interno:', error);
      // Manejar errores específicos aquí
      if (error.code === 11000) {
        // Lanzar una excepción de conflicto si hay un duplicado
        throw new ConflictException(`${createFavoriteDto.id_gasolinera} ya existe.`);
      }

      // Si hay otros tipos de errores, lanzar una excepción de error interno del servidor
      throw new InternalServerErrorException('Algo salió mal.');
    }
  }

  async findAll(): Promise<Favorite[]> {
    return this.favoriteRepository.find();
  }
  findOne(id: number) {
    return `This action returns a #${id} favorite`;
  }

  update(id: number, updateFavoriteDto: UpdateFavoriteDto) {
    return `This action updates a #${id} favorite`;
  }

  async removeByFields(campo1: number, campo2: number): Promise<{ message: string }> {
    const deletedEntity = await this.favoriteRepository
      .createQueryBuilder()
      .delete()
      .from(Favorite)
      .where('id_usuario = :campo1 AND id_gasolinera = :campo2', { campo1, campo2 })
      .execute();

    if (deletedEntity.affected === 1) {
      return { message: 'La entidad se eliminó correctamente' };
    } else {
      return { message: 'La entidad no se encontró o no se pudo eliminar' };
    }
  }

}
