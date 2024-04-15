import { Injectable } from '@nestjs/common';
import { SampleEntity } from '../entities/sample.entity';
import { SampleRepository } from '../repositories/sample.repository';

@Injectable()
export class SampleService {
    constructor(
        private readonly sampleRepository: SampleRepository,
    ) {}

    async getSampleEntities(): Promise<SampleEntity[]> {
        return this.sampleRepository.findAll();
    }
}