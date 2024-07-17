import { Controller, Get, Post, Headers } from '@nestjs/common';
import { FuelStationService } from './fuel-station.service';

@Controller('fuel-station')
export class FuelStationController {
    constructor(private readonly fuelStationService: FuelStationService) { }

    @Post('save-to-database') // Puedes cambiar la ruta según tus necesidades
    async saveFuelStationsToDatabase() {
        try {
            await this.fuelStationService.getFuelStations();
            return { success: true, message: 'Fuel stations saved to the database successfully.' };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }
    @Get('top-fuel95-stations')
    async getTopFuelStations() {
        try {
            const topFuelStations = await this.fuelStationService.getTopFuel95Stations();
            return { success: true, data: topFuelStations };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }
    @Get('top-fuelGasA-stations')
    async getTopFuelGasAStations() {
        try {
            const topFuelStations = await this.fuelStationService.getTopFuelGasAStations();
            return { success: true, data: topFuelStations };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }
    @Get('top-fuelGasB-stations')
    async getTopFuelGasBStations() {
        try {
            const topFuelStations = await this.fuelStationService.getTopFuelGasAStations();
            return { success: true, data: topFuelStations };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }
    @Get('stations-municipality')
    async getFuelStationsByMunicipality(@Headers('municipio') municipality: string) {
        if (!municipality) {
            return { success: false, error: 'Municipio no proporcionado en el encabezado' };
        }   

        try {
            const fuelStations = await this.fuelStationService.getFuelStationsByMunicipality(municipality);
            console.log(fuelStations)
            return { success: true, data: fuelStations };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }
    @Get('/municipios')
    async getAllMunicipios(): Promise<string[]> {
        try {
            const municipios = await this.fuelStationService.getAllMunicipios();
            return municipios;
        } catch (error) {
            // Manejar el error como desees, por ejemplo, retornando un mensaje de error al cliente
            console.error(error.message);
            throw new Error('Error fetching all municipios');
        }
    }
}