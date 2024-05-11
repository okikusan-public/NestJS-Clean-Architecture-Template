import { Controller, Get, Inject } from '@nestjs/common';
import { ISampleUseCase, SAMPLE_USECASE_TOKEN } from './interfaces/sample.usecase.interface';

@Controller('samples')
export class SampleController {
  constructor(
    @Inject(SAMPLE_USECASE_TOKEN)
    private readonly sampleUseCase: ISampleUseCase,
  ) {}

  @Get()
  async getSamples(): Promise<any> {
    const result = await this.sampleUseCase.execute();
    return { data: result };
  }
}