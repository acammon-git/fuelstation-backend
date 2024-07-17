import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'fuel-station' })
export class FuelStation {
  @PrimaryGeneratedColumn()
  id_gasolinera?: number;

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

  @Column({ type: 'float' }) // Asegúrate de que el tipo sea 'float'
  latitud: number;

  @Column({ type: 'float' }) // Asegúrate de que el tipo sea 'float'
  longitud: number;

  @Column({ type: 'float' }) // Asegúrate de que el tipo sea 'float'
  precio_gasoleoA: number;

  @Column({ type: 'float' }) // Asegúrate de que el tipo sea 'float'
  precio_gasoleoB: number;

  @Column({ type: 'float' }) // Asegúrate de que el tipo sea 'float'
  precio_gasolina95: number;
}