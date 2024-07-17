import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // Cambio de Mongoose a TypeORM
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { User } from './entities/user.entity'; // Importa la entidad User de TypeORM
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthGuard, UsersService],
  imports: [
    // configuramos nuestras variables de entorno
    ConfigModule.forRoot(),
    // importamos nuestras entities para usarlas a nivel de modulo
    TypeOrmModule.forFeature([User]), 
    // configuramos nuestro modulo de jwt
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SEED,
      signOptions: { expiresIn: '6h' }, // caducidad del jwt
    }),
  ],
})
export class AuthModule {}