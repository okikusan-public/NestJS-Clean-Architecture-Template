import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SampleEntity } from '../entities/sample.entity';

@Injectable()
export class SampleService {
    constructor(
        @InjectRepository(SampleEntity)
        private readonly sampleRepository: Repository<SampleEntity>,
    ) {}

    async getSampleEntity(): Promise<SampleEntity[]> {
        return this.sampleRepository.find();
    }
}
