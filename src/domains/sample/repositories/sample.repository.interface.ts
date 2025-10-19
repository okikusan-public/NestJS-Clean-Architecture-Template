import { SampleEntity } from '../entities/sample.entity';
import { CreateSampleDto } from '../../../interfaces/web/dto/create-sample.dto';

export const SAMPLE_REPOSITORY_TOKEN = Symbol('ISampleRepository');

export interface ISampleRepository {
  findAll(): Promise<SampleEntity[]>;
  findById(id: number): Promise<SampleEntity | null>;
  create(dto: CreateSampleDto): Promise<SampleEntity>;
  update(
    id: number,
    dto: Partial<CreateSampleDto>,
  ): Promise<SampleEntity | null>;
  delete(id: number): Promise<boolean>;
}
