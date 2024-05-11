import { Inject, Injectable } from '@nestjs/common';
import { SampleEntity } from '../../domains/sample/entities/sample.entity';
import { ISampleService, SAMPLE_SERVICE_TOKEN } from '../interfaces/sample.service.interface';

@Injectable()
export class SampleUseCase {
  constructor(
    @Inject(SAMPLE_SERVICE_TOKEN)
    private readonly sampleService: ISampleService,
  ) {}

  async execute(): Promise<SampleEntity[]> {
    return this.sampleService.getSampleEntities();
  }
}