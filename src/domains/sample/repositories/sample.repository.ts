import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SampleEntity } from '../entities/sample.entity';

@Injectable()
export class SampleRepository {
    constructor(
        @InjectRepository(SampleEntity)
        private readonly repository: Repository<SampleEntity>,
    ) {}

    async findAll(): Promise<SampleEntity[]> {
        return this.repository.find();
    }
}