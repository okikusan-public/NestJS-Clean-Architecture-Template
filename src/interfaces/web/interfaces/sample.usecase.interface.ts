import { SampleEntity } from '../../../domains/sample/entities/sample.entity';

export const SAMPLE_USECASE_TOKEN = 'SAMPLE_USECASE_TOKEN';

export interface ISampleUseCase {
  execute(): Promise<SampleEntity[]>;
}