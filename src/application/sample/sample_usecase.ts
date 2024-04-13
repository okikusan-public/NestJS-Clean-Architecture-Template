import { Injectable } from '@nestjs/common';
import { SampleService } from '../../domains/sample/services/sample.service';

@Injectable()
export class SampleUseCase {
  constructor(private readonly sampleService: SampleService) {}

  async execute(): Promise<void> {
    const samples = await this.sampleService.getSampleEntity();
  }
}