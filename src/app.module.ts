
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm'; // Cambio de Mongoose a TypeORM

import { AuthModule } from './auth/auth.module';

import { User } from './auth/entities/user.entity';
import { UsersModule } from './users/users.module';


import { NestFactory } from '@nestjs/core';
import { ServeImagesModule } from './serve-images/serve-images.module';
import { FuelStationModule } from './fuel-stations/fuel-station.module';
import { FuelStation } from './fuel-stations/entities/fuel-stations.entity';
import { FavoritesModule } from './favorites/favorites.module';
import { Favorite } from './favorites/entities/favorite.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    // datos de conexión a la base de datos
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: process.env.MYSQL_HOST,
        port: +process.env.MYSQL_PORT,
        username: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        entities: [User,FuelStation,Favorite,], // Agrega aquí todas las entidades que quieras utilizar
        synchronize: false,
         // Cambia a false en producción
      }),
    }),
    
    // TODO: Habilitar los siguientes módulos
    AuthModule,
    UsersModule,
    ServeImagesModule,
    FuelStationModule,
    FavoritesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Habilita CORS para todas las rutas y métodos
    consumer.apply((req, res, next) => {
      // Configura las opciones CORS según tus necesidades
      res.header('Access-Control-Allow-Origin', 'http://localhost:4200'); // Permite solicitudes desde tu aplicación Angular
      res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization');
      next();
    }).forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}

// Habilita CORS en el servidor Nest.js
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Habilita CORS
  await app.listen(3001);
}

bootstrap();