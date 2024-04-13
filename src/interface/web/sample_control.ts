import { Controller, Get } from '@nestjs/common';
import { SampleUseCase } from '../../application/sample/sample_usecase';

@Controller('samples')
export class SampleController {
  constructor(private readonly sampleUseCase: SampleUseCase) {}

  @Get()
  async getSamples(): Promise<any> {
    const result = await this.sampleUseCase.execute();
    return { data: result };
  }
}