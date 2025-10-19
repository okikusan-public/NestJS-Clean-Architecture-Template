import { Inject, Injectable } from '@nestjs/common';
import {
  ISampleRepository,
  SAMPLE_REPOSITORY_TOKEN,
} from '../repositories/sample.repository.interface';
import { ISampleService } from '../interfaces/sample.service.interface';
import { CreateSampleDto } from '../../../interfaces/web/dto/create-sample.dto';
import { SampleResponseDto } from '../dto/sample-response.dto';
import { SampleNotFoundException } from '../exceptions/sample-not-found.exception';

@Injectable()
export class SampleService implements ISampleService {
  constructor(
    @Inject(SAMPLE_REPOSITORY_TOKEN)
    private readonly sampleRepository: ISampleRepository,
  ) {}

  async getSampleEntities(): Promise<SampleResponseDto[]> {
    const entities = await this.sampleRepository.findAll();
    return entities.map((entity) => SampleResponseDto.fromEntity(entity));
  }

  async getSampleById(id: number): Promise<SampleResponseDto> {
    const entity = await this.sampleRepository.findById(id);
    if (!entity) {
      throw new SampleNotFoundException(id);
    }
    return SampleResponseDto.fromEntity(entity);
  }

  async createSample(dto: CreateSampleDto): Promise<SampleResponseDto> {
    const entity = await this.sampleRepository.create(dto);
    return SampleResponseDto.fromEntity(entity);
  }

  async updateSample(
    id: number,
    dto: Partial<CreateSampleDto>,
  ): Promise<SampleResponseDto> {
    const entity = await this.sampleRepository.update(id, dto);
    if (!entity) {
      throw new SampleNotFoundException(id);
    }
    return SampleResponseDto.fromEntity(entity);
  }

  async deleteSample(id: number): Promise<void> {
    const deleted = await this.sampleRepository.delete(id);
    if (!deleted) {
      throw new SampleNotFoundException(id);
    }
  }
}
