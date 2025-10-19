import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('sample')
export class SampleOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;
}
