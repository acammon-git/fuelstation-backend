
import { SchemaFactory } from '@nestjs/mongoose';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id_usuario: number;

    @Column()
    nombre: string;

    @Column({ nullable: false })
    password: string;

    @Column({ unique:true })
    email: string;

    @Column()
    telefono: number;

    @Column()
    pais: string;

    @Column({ type: 'timestamp', default: null, nullable: true })
    last_login: Date;
  
    @Column()
    foto: string;

    @Column({default:true , nullable: true })
    activo: number;
}

export const UserSchema= SchemaFactory.createForClass(User);
