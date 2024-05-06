import { SampleEntity } from '../entities/sample.entity';

export const SAMPLE_REPOSITORY_TOKEN = Symbol('ISampleRepository');

export interface ISampleRepository {
    findAll(): Promise<SampleEntity[]>;
}