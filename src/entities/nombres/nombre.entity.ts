import { Entity, PrimaryColumn } from 'typeorm';

@Entity('nombres')
export class Nombre {
  @PrimaryColumn()
  nombre: string;
}