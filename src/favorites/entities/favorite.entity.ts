import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Favorite {
    @Column()
    id_usuario: number;

     @PrimaryGeneratedColumn()
    id_gasolinera: number;

    @Column()
    municipio: string;

    @Column() // Asegúrate de que el tipo sea 'float'
    id_provincia: number;

    @Column()
    direccion: string;

    @Column()
    localidad: string;

    @Column()
    horario: string;

    @Column()
    rotulo: string;

    @Column() // Asegúrate de que el tipo sea 'float'
    latitud: number;

    @Column() // Asegúrate de que el tipo sea 'float'
    longitud: number;

    @Column() // Asegúrate de que el tipo sea 'float'
    precio_gasoleoA: number;

    @Column() // Asegúrate de que el tipo sea 'float'
    precio_gasoleoB: number;

    @Column() // Asegúrate de que el tipo sea 'float'
    precio_gasolina95: number;
}
