import { Inject, Injectable } from '@nestjs/common';
import {
  ISampleService,
  SAMPLE_SERVICE_TOKEN,
} from '../interfaces/sample.service.interface';
import { ISampleUseCase } from '../../interfaces/web/interfaces/sample.usecase.interface';
import { CreateSampleDto } from '../../interfaces/web/dto/create-sample.dto';
import { SampleResponseDto } from '../../domains/sample/dto/sample-response.dto';

@Injectable()
export class SampleUseCase implements ISampleUseCase {
  constructor(
    @Inject(SAMPLE_SERVICE_TOKEN)
    private readonly sampleService: ISampleService,
  ) {}

  async getAll(): Promise<SampleResponseDto[]> {
    return this.sampleService.getSampleEntities();
  }

  async getById(id: number): Promise<SampleResponseDto> {
    return this.sampleService.getSampleById(id);
  }

  async create(dto: CreateSampleDto): Promise<SampleResponseDto> {
    return this.sampleService.createSample(dto);
  }

  async update(
    id: number,
    dto: Partial<CreateSampleDto>,
  ): Promise<SampleResponseDto> {
    return this.sampleService.updateSample(id, dto);
  }

  async delete(id: number): Promise<void> {
    return this.sampleService.deleteSample(id);
  }
}
