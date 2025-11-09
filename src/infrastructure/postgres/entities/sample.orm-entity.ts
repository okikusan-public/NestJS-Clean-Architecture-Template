import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('sample_entity')
export class SampleOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;
}
