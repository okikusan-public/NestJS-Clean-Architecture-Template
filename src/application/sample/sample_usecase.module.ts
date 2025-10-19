import { Module } from '@nestjs/common';
import { SampleUseCase } from './sample_usecase';
import { SampleDomainModule } from '../../domains/sample/sample_domain.module';
import { SAMPLE_USECASE_TOKEN } from '../../interfaces/web/interfaces/sample.usecase.interface';

@Module({
  imports: [SampleDomainModule],
  providers: [
    {
      provide: SAMPLE_USECASE_TOKEN,
      useClass: SampleUseCase,
    },
  ],
  exports: [SAMPLE_USECASE_TOKEN],
})
export class SampleModule {}
