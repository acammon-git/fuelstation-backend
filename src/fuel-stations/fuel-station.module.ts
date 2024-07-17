import { Module } from '@nestjs/common';
import { FuelStationController } from './fuel-station.controller';
import { FuelStationService } from './fuel-station.service';
import { FuelStation } from './entities/fuel-stations.entity';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';

@Module({
    controllers: [FuelStationController],
    providers: [FuelStationService],
    imports: [
        // configuramos nuestras variables de entorno
        ConfigModule.forRoot(),
        // importamos nuestras entities para usarlas a nivel de modulo
        TypeOrmModule.forFeature([FuelStation]),
        HttpModule,
        
    ],
})
export class FuelStationModule {}
