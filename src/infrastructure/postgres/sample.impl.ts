import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SampleEntity } from '../../domains/sample/entities/sample.entity';
import { ISampleRepository } from '../../domains/sample/repositories/sample.repository.interface';

@Injectable()
export class SampleRepositoryImpl implements ISampleRepository {
    constructor(
        @InjectRepository(SampleEntity)
        private readonly repository: Repository<SampleEntity>,
    ) {}

    async findAll(): Promise<SampleEntity[]> {
        return this.repository.find();
    }
}