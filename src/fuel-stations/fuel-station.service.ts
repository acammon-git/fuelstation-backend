import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { FuelStation } from './entities/fuel-stations.entity';


@Injectable()
export class FuelStationService {
    constructor(
        private readonly httpService: HttpService,
        @InjectRepository(FuelStation)
        private readonly fuelStationRepository: Repository<FuelStation>,
    ) { }

    async getFuelStations(): Promise<FuelStation[]> {
        const url = 'https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/';

        try {
            const response = await this.httpService.get(url).toPromise();
            const fuelStationsData = response.data.ListaEESSPrecio;

            const fuelStations = await this.saveFuelStations(fuelStationsData);

            return fuelStations;
        } catch (error) {
            throw new Error(`Error fetching data from ${url}: ${error.message}`);
        }
    }

    mapToFuelStation(data: any): FuelStation {
        console.log('Original Data:', data);

        const parseNumber = (value: any) => {
            const parsedValue = Number(value.replace(',', '.'));
            return isNaN(parsedValue) ? 0 : parsedValue;
        };

        const mappedData: FuelStation = {
            municipio: data.Municipio || '',
            id_provincia: parseInt(data.IDProvincia, 10) || 0,
            direccion: data.Dirección || '',
            localidad: data.Localidad || '',
            horario: data.Horario || '',
            rotulo: data.Rótulo || '',
            latitud: parseNumber(data.Latitud),
            longitud: parseNumber(data['Longitud (WGS84)']),
            precio_gasoleoA: parseNumber(data['Precio Gasoleo A']),
            precio_gasoleoB: parseNumber(data['Precio Gasoleo B']),
            precio_gasolina95: parseNumber(data['Precio Gasolina 95 E5']),
        };
        console.log('Mapped Data:', mappedData);

        return mappedData;
    }

    async saveFuelStations(fuelStationData: any[]): Promise<FuelStation[]> {
        try {
            const savedFuelStations: FuelStation[] = [];

            for (const data of fuelStationData) {
                // Verificar si la estación ya existe en la base de datos
                const existingFuelStation = await this.fuelStationRepository.findOne({
                    where: { id_gasolinera: data['IDEESS'] },  // Usar el campo correcto
                });

                if (!existingFuelStation) {
                    const mappedData: FuelStation = this.mapToFuelStation(data);

                    const newFuelStation = this.fuelStationRepository.create(mappedData);
                    const savedFuelStation = await this.fuelStationRepository.save(newFuelStation);
                    savedFuelStations.push(savedFuelStation);
                }
            }

            return savedFuelStations;
        } catch (error) {
            console.error(`Error saving fuel stations to the database: ${error.message}`);
            console.error(error.stack);
            throw new Error(`Error saving fuel stations to the database: ${error.message}`);
        }
    }
    async getTopFuel95Stations(): Promise<FuelStation[]> {
        try {
            // Consulta a la base de datos para obtener las 10 gasolineras con el precio más bajo
            const topFuelStations = await this.fuelStationRepository.find({
                where: {
                    precio_gasolina95: MoreThan(0), // Agrega la condición para excluir precios a 0
                },
                order: {
                    precio_gasolina95: 'ASC', // Ordenar por precio de gasolina ascendente
                },
                take: 10, // Obtener solo las primeras 10
            });

            return topFuelStations;
        } catch (error) {
            console.error(`Error fetching top fuel stations: ${error.message}`);
            console.error(error.stack);
            throw new Error(`Error fetching top fuel stations: ${error.message}`);
        }
    }
    async getTopFuelGasAStations(): Promise<FuelStation[]> {
        try {
            // Consulta a la base de datos para obtener las 10 gasolineras con el precio más bajo
            const topFuelStations = await this.fuelStationRepository.find({
                where: {
                    precio_gasoleoA: MoreThan(0), // Agrega la condición para excluir precios a 0
                },
                order: {
                    precio_gasoleoA: 'ASC', // Ordenar por precio de gasolina ascendente
                },
                take: 10, // Obtener solo las primeras 10
            });

            return topFuelStations;
        } catch (error) {
            console.error(`Error fetching top fuel stations: ${error.message}`);
            console.error(error.stack);
            throw new Error(`Error fetching top fuel stations: ${error.message}`);
        }
    }
    async getTopFuelGasBStations(): Promise<FuelStation[]> {
        try {
            // Consulta a la base de datos para obtener las 10 gasolineras con el precio más bajo
            const topFuelStations = await this.fuelStationRepository.find({
                where: {
                    precio_gasoleoB: MoreThan(0), // Agrega la condición para excluir precios a 0
                },
                order: {
                    precio_gasoleoB: 'ASC', // Ordenar por precio de gasolina ascendente
                },
                take: 10, // Obtener solo las primeras 10
            });

            return topFuelStations;
        } catch (error) {
            console.error(`Error fetching top fuel stations: ${error.message}`);
            console.error(error.stack);
            throw new Error(`Error fetching top fuel stations: ${error.message}`);
        }
    }
    async getAllMunicipios(): Promise<string[]> {
        try {
            const municipios = await this.fuelStationRepository
                .createQueryBuilder('fuelStation')
                .select('DISTINCT fuelStation.municipio', 'municipio')
                .getRawMany();

            return municipios.map((item) => item.municipio);
        } catch (error) {
            console.error(`Error fetching distinct municipios: ${error.message}`);
            throw new Error('Error fetching distinct municipios');
        }
    }
    async getFuelStationsByMunicipio(municipio: string): Promise<FuelStation[]> {
        try {
            // Consulta a la base de datos para obtener las gasolineras de un municipio específico
            const fuelStationsInMunicipio = await this.fuelStationRepository.find({
                where: {
                    municipio: municipio,
                }
            });

            return fuelStationsInMunicipio;
        } catch (error) {
            console.error(`Error fetching fuel stations by municipio: ${error.message}`);
            console.error(error.stack);
            throw new Error(`Error fetching fuel stations by municipio: ${error.message}`);
        }
    }
    async getFuelStationsByMunicipality(municipality: string): Promise<FuelStation[]> {
        try {
            // Consultar las gasolineras por municipio
            const fuelStations = await this.fuelStationRepository.find({
                where: { municipio: municipality },
            });
            return fuelStations;
            
        } catch (error) {
            console.error(`Error getting fuel stations by municipality: ${error.message}`);
            console.error(error.stack);
            throw new Error(`Error getting fuel stations by municipality: ${error.message}`);
        }
    }
}