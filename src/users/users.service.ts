import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcryptjs from 'bcryptjs';
import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload';



@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,

  ) { }
  async getAllElements() {
    try {
      // Utiliza el repositorio de TypeORM para realizar una consulta y obtener todos los elementos
      const elements = await this.userRepository.find();
      return elements;
    } catch (error) {
      // Manejo de errores, puedes personalizarlo según tus necesidades
      throw new Error('Error al obtener los elementos');
    }
  }
  

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const {email, password, ...userData } = createUserDto;
      const existingUser = await this.userRepository.findOne({ where: { email } });
      if (existingUser) {
        throw new BadRequestException(`El email ${email} ya existe.`);
      }
      const newUser = this.userRepository.create({
        email, password: bcryptjs.hashSync(password, 10),
        ...userData,
      });
      await this.userRepository.save(newUser);
      const { ...user } = newUser;
      return user;
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException(`${createUserDto.email} already exists!`);
      }
      throw new InternalServerErrorException('Something went wrong');
    }
    
  }
  

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }
  
  async findOne(id: number): Promise<{ message: string } | any> {
    const user = await this.userRepository.findOne({ where: { id_usuario: id } });

    if (user) {
      return user;
    } else {
      return { message: 'Entidad no encontrada' };
    }
  }


  async update(id:number, updateUserDto: UpdateUserDto): Promise<User | null> {
    // Realiza la lógica para actualizar los datos del usuario
    const user = await this.userRepository.findOne({where: {id_usuario: id}});
    
    if (!user) {
      throw new NotFoundException(`El usuario con ID ${id} no fue encontrado.`);
    }
    console.log(updateUserDto);
    // Actualiza los campos que desees del usuario basado en los datos proporcionados en updateAuthDto
    if (updateUserDto.email) {
      user.email = updateUserDto.email;
    }
    
    if (updateUserDto.nombre) {
      user.nombre = updateUserDto.nombre;
    }
  
    if (updateUserDto.password) {
      user.password = bcryptjs.hashSync(updateUserDto.password, 10);
    }
  
    if (updateUserDto.pais) {
      user.pais = updateUserDto.pais;
    }
    if (updateUserDto.foto) {
      user.foto = updateUserDto.foto;
    }
    if (updateUserDto.activo) {
      user.activo = updateUserDto.activo;
    }
  
    // Guarda los cambios en la base de datos
    await this.userRepository.save(user);
    // Devuelve el usuario actualizado
    return user;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
  getJwtToken(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }
}
