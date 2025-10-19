import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SampleEntity } from '../../domains/sample/entities/sample.entity';
import { ISampleRepository } from '../../domains/sample/repositories/sample.repository.interface';
import { CreateSampleDto } from '../../domains/sample/dto/create-sample.dto';

@Injectable()
export class SampleRepositoryImpl implements ISampleRepository {
  constructor(
    @InjectRepository(SampleEntity)
    private readonly repository: Repository<SampleEntity>,
  ) {}

  async findAll(): Promise<SampleEntity[]> {
    return this.repository.find();
  }

  async findById(id: number): Promise<SampleEntity | null> {
    return this.repository.findOne({ where: { id } });
  }

  async create(dto: CreateSampleDto): Promise<SampleEntity> {
    const entity = this.repository.create(dto);
    return this.repository.save(entity);
  }

  async update(
    id: number,
    dto: Partial<CreateSampleDto>,
  ): Promise<SampleEntity | null> {
    const entity = await this.findById(id);
    if (!entity) {
      return null;
    }
    Object.assign(entity, dto);
    return this.repository.save(entity);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected !== null && result.affected > 0;
  }
}
