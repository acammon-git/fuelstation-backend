
import { SchemaFactory } from '@nestjs/mongoose';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id_usuario: number;

    @Column()
    nombre: string;

    @Column()
    password: string;

    @Column()
    email: string;

    @Column()
    telefono: number;

    @Column()
    pais: string;

    @Column()
    provincia: string;

    @Column()
    foto: string;

    @Column()
    activo: number;
    
    @Column()
    last_login: Date;
}

export const UserSchema= SchemaFactory.createForClass(User);
