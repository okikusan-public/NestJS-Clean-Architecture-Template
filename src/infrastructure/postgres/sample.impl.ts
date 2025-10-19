import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SampleEntity } from '../../domains/sample/entities/sample.entity';
import { SampleOrmEntity } from './entities/sample.orm-entity';
import { SampleMapper } from './mappers/sample.mapper';
import { ISampleRepository } from '../../domains/sample/repositories/sample.repository.interface';
import { CreateSampleDto } from '../../interfaces/web/dto/create-sample.dto';

@Injectable()
export class SampleRepositoryImpl implements ISampleRepository {
  constructor(
    @InjectRepository(SampleOrmEntity)
    private readonly repository: Repository<SampleOrmEntity>,
  ) {}

  async findAll(): Promise<SampleEntity[]> {
    const ormEntities = await this.repository.find();
    return ormEntities.map(SampleMapper.toDomain);
  }

  async findById(id: number): Promise<SampleEntity | null> {
    const ormEntity = await this.repository.findOne({ where: { id } });
    return ormEntity ? SampleMapper.toDomain(ormEntity) : null;
  }

  async create(dto: CreateSampleDto): Promise<SampleEntity> {
    const ormEntity = this.repository.create(dto);
    const savedOrmEntity = await this.repository.save(ormEntity);
    return SampleMapper.toDomain(savedOrmEntity);
  }

  async update(
    id: number,
    dto: Partial<CreateSampleDto>,
  ): Promise<SampleEntity | null> {
    const ormEntity = await this.repository.findOne({ where: { id } });
    if (!ormEntity) {
      return null;
    }
    Object.assign(ormEntity, dto);
    const savedOrmEntity = await this.repository.save(ormEntity);
    return SampleMapper.toDomain(savedOrmEntity);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected !== null && result.affected > 0;
  }
}
