import { SampleEntity } from '../../domains/sample/entities/sample.entity';

export const SAMPLE_SERVICE_TOKEN = 'ISampleService';

export interface ISampleService {
    getSampleEntities(): Promise<SampleEntity[]>;
}