import { PartialType } from '@nestjs/mapped-types';
import {  CreateStation } from './create-station.dto';
import { IsString, IsEmail, MaxLength, IsNumber } from 'class-validator';

export class UpdateStationService extends PartialType(CreateStation) {
    
}
