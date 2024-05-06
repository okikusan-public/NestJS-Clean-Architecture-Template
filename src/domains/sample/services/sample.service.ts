import { Inject, Injectable } from '@nestjs/common';
import { SampleEntity } from '../entities/sample.entity';
import { ISampleRepository, SAMPLE_REPOSITORY_TOKEN } from '../repositories/sample.repository.interface';

@Injectable()
export class SampleService {
    constructor(
        @Inject(SAMPLE_REPOSITORY_TOKEN)
        private readonly sampleRepository: ISampleRepository,
    ) {}

    async getSampleEntities(): Promise<SampleEntity[]> {
        return this.sampleRepository.findAll();
    }
}